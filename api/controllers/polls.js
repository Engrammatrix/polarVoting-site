const db = require('./database.js')

async function listPolls(_request, response) {
    const SQL = `SELECT id, title, status, date_created
                 FROM ${db.Tables.POLLS};`
    db.query(SQL).then(result => {
        response.json(result)
    }).catch(error => {
        console.error(error)
        response.json({})
    })
}

async function getPoll(request, response) {
    getPollFromId(request.params.id).then(result => {
        response.json(result)
    }).catch(error => {
        console.error(error)
        response.json({})
    })
}

async function getPollResults(request, response) {
    getPollFromId(request.params.id).then(result => {
        let { answers, ...poll } = result
        getVotesForPoll(request.params.id).then(votes => {
            poll['results'] = formatVoteResults(votes, answers)
            response.json(poll)
        }).catch(error => {
            console.error(error)
            poll['results'] = undefined
            response.json(poll)
        })
    }).catch(error => {
        console.error(error)
        response.json({})
    })
}

async function getPollFromId(pollId) {
    return new Promise((resolve, reject) => {
        const SQL = `SELECT *
                     FROM ${db.Tables.POLLS}
                     WHERE id = ${pollId};`
        db.query(SQL).then(result => {
            let poll = result.pop()
            if (poll == undefined) return {}
            poll['answers'] = JSON.parse(poll['answers'])
            poll['multiple_answers'] = poll['multiple_answers'] == 0 ? false : true
            return resolve(poll)
        }).catch(error => {
            return reject(error)
        })  
    })
}

async function getVotesForPoll(pollId) {
    return new Promise((resolve, reject) => {
        const SQL = `SELECT user_id, answers
                     FROM ${db.Tables.VOTES}
                     WHERE polls_id = ${pollId};`
        db.query(SQL).then(result => {
            return resolve(result)
        }).catch(error => {
            return reject(error)
        })
    })
}

function formatVoteResults(votes, answers) {
    let totalVotes = 0
    for (let vote of votes) {
        let voteValues = JSON.parse(vote.answers)
        totalVotes += voteValues.length

        for (let value of voteValues) {
            let index = answers.findIndex(obj => {
                return obj.id === value
            })
            answers[index]['votes'] = (answers[index]['votes'] || 0) + 1
        }
    }
    return { 
        'total_voters': votes.length,
        'total_votes': totalVotes,
        'answers': answers
    }
}

module.exports = {
    listPolls,
    getPoll,
    getPollResults,
}

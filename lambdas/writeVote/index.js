const mysql = require('mysql')

const VOTES_TABLE = 'votes'

const config = {
    host: process.env.RDS_HOSTNAME || 'localhost',
    user: process.env.RDS_USERNAME || 'root',
    password: process.env.RDS_PASSWORD || 'password',
    database: process.env.RDS_DB_NAME || 'csci4145',
    port: process.env.RDS_PORT || 3306,
}

let pool = mysql.createPool(config)

exports.handler = function(event, context) {
    event.Records.forEach(record => {
        const { body } = record
        try {
            const vote = JSON.parse(body)
            if (vote.hasOwnProperty('poll_id') && vote.hasOwnProperty('user_id') && vote.hasOwnProperty('answers')) {
                let SQL = `INSERT INTO ${VOTES_TABLE} (polls_id, user_id, answers)
                           VALUES (?, ?, ?);`
                pool.query(SQL, [vote.poll_id, vote.user_id, JSON.stringify(vote.answers)], (error, results) => {
                    if (error) {
                        console.error(error)
                    }
                    context.succeed("done")
                })
            }
        } catch (e) {
            console.error(e)
            return
        }
    })
}
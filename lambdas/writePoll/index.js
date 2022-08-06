const mysql = require('mysql')

const POLLS_TABLE = 'polls'

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
            const poll = JSON.parse(body)
            if (poll.hasOwnProperty('title') && poll.hasOwnProperty('answers') && poll.hasOwnProperty('multiple_answers') && poll.hasOwnProperty('creator_id')) {
                let SQL = `INSERT INTO ${POLLS_TABLE} (id, title, answers, multiple_answers, status, date_created, creator_id)
                           VALUES (default, ?, ?, ?, default, now(), ?);`
                pool.query(SQL, [poll.title, JSON.stringify(poll.answers), poll.multiple_answers ? 1 : 0, poll.creator_id], (error, results) => {
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
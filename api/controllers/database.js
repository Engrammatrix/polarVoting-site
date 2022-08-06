const mysql = require('mysql')

const config = {
    host: process.env.RDS_HOSTNAME || 'localhost',
    user: process.env.RDS_USERNAME || 'root',
    password: process.env.RDS_PASSWORD || 'password',
    database: process.env.RDS_DB_NAME || 'csci4145',
    port: process.env.RDS_PORT || 3306,
}

const Tables = {
    POLLS: 'polls',
    VOTES: 'votes',
}

let connection = mysql.createConnection(config)

connection.connect((error) => {
    if (error) {
        return console.error(`Error: ${error.message}`)
    }
    const { password, ...configuration } = config
    console.log(`Connected with config: ${JSON.stringify(configuration)}`)
})

// This is a promise based wrapper for the SQL query function
function query(sql, args) {
    return new Promise((resolve, reject) => {
        connection.query(sql, args, (error, results) => {
            if (error) {
                return reject(error)
            }
            resolve(mapQueryResultsToJSON(results))
        })
    })
}

// Map the results from sql queries to json format
function mapQueryResultsToJSON(results) {
    if (typeof results.map === 'function') {
        return results.map(result => Object.assign({}, result))
    } else {
        return results
    }
}

module.exports = {
    query,
    Tables,
}
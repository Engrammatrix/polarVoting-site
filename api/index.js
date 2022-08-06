const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const cors = require('cors')
const pollsController = require('./controllers/polls.js')

const api = express()
api.use(cors())

api.get('/api/polls', pollsController.listPolls)
api.get('/api/polls/:id', pollsController.getPoll)
api.get('/api/polls/:id/result', pollsController.getPollResults)

api.listen(8080, () => {
    console.log('Api running on port 8080')
})
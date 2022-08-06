import axios from 'axios'
import User  from './User.js'

export default class APIGateway {
    static API_URL = process.env.REACT_APP_API_URL
    /**
     * Get a list of all polls available.
     * @returns {Array} a list of polls
     */
    static getPollsList() {
        let ENDPOINT = `${this.API_URL}/polls`
        return new Promise((resolve, reject) => {
            axios.get(ENDPOINT).then(result => {
                resolve(result.data)
            }).catch(error => {
                reject(error)
            })
        })
    }

    /**
     * Get information on a poll based on its id.
     * @param {Number, String} pollId 
     * @returns {Object} a poll
     */
    static getPoll(pollId) {
        let ENDPOINT = `${this.API_URL}/polls/${pollId}`
        return new Promise((resolve, reject) => {
            axios.get(ENDPOINT).then(result => {
                resolve(result.data)
            }).catch(error => {
                reject(error)
            })
        })
    }

    /**
     * Get the results of a poll by id.
     * @param {Number, String} pollId 
     * @returns {Object} a poll
     */
    static getPollResults(pollId) {
        let ENDPOINT = `${this.API_URL}/polls/${pollId}/result`
        return new Promise((resolve, reject) => {
            axios.get(ENDPOINT).then(result => {
                resolve(result.data)
            }).catch(error => {
                reject(error)
            })
        })
    }

    /**
     * Creates a new poll with for the current user.
     * @param {String} title 
     * @param {Array} answers (Array of strings)
     * @param {Boolean} multipleAnswers
     */
    static createPoll(title, answers, multipleAnswers = false) {
        let ENDPOINT = `${this.API_URL}/polls`
        User.getId().then(userId => {
            axios.post(ENDPOINT, {
                "title": title,
                "creator_id": userId,
                "answers": answers.map((value, index) => ({ id: index + 1, text: value })),
                "multiple_answers": multipleAnswers,
            })
        })
    }

    /**
     * Creates a new vote on a poll for the user.
     * @param {Number, String} pollId 
     * @param {Array} answers (Array of int) 
     */
    static castVote(pollId, answers) {
        let ENDPOINT = `${this.API_URL}/polls/vote`
        User.getId().then(userId => {
            axios.post(ENDPOINT, {
                "poll_id": pollId,
                "user_id": userId,
                "answers": answers,
            })
        })
    }
}

const axios = require('axios')

export default class User {
    static LOCAL_STORAGE_KEY = 'userId'

    /**
     * Get the id used for the current user.
     * @returns {Promise} userId
     */
    static getId() {
        return new Promise((resolve, _reject) => {
            let userId = this.getFromLocalStorage()
            if (userId) {
                return resolve(userId)
            }
            axios.get("https://ipapi.co/json").then(result => {
                return this.resolveAndUpdateUserId(resolve, result?.data?.ip)
            }).catch(_error => {
                return this.resolveAndUpdateUserId(resolve)
            })
        })
    }

    /**
     * Resolve the promise and update storage with the userId.
     * @param {Function} resolve (Function to resolve promise)
     * @param {String} userId 
     * @returns {String} userId
     */
    static resolveAndUpdateUserId(resolve, userId) {
        if (userId === undefined) {
            userId = this.uuid()
        }
        this.updateLocalStorage(userId)
        return resolve(userId)
    }

    /**
     * Get the user id from localstorage if there.
     * @returns {String} user id
     */
    static getFromLocalStorage() {
        if (typeof localStorage == undefined) {
            return null
        } else {
            return localStorage?.getItem(this.LOCAL_STORAGE_KEY)
        }
    }

    /**
     * Update the localstorage with a new user id.
     * @param {String} userId 
     * @returns 
     */
    static updateLocalStorage(userId) {
        if (typeof localStorage == undefined) {
            return undefined
        } else {
            localStorage.setItem(this.LOCAL_STORAGE_KEY, userId)
            return localStorage?.getItem(this.LOCAL_STORAGE_KEY)
        }
    }

    /**
     * Generate a uuid.
     * @returns {String} uuidv4
     */
    static uuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            // eslint-disable-next-line
            let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

}

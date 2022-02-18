const db = require('../utils/db')

module.exports = {
    // get ratings and no. of comments?
    async createOrder(req, res) {

        console.log('what was searched', req.query);


        try {


        } catch (error) {
            console.error('ERR details', error)
            res.sendStatus(500)
        }

    },


    async getAll(req, res) {

        console.log('what was searched', req.query);


        try {
            

        } catch (error) {
            console.error('ERR details', error)
            res.sendStatus(500)
        }

    },

    async addToOrder(req, res) {

        console.log('what was searched', req.query);


        try {


        } catch (error) {
            console.error('ERR details', error)
            res.sendStatus(500)
        }

    },

    async getReport(req, res) {

        console.log('what was searched', req.query);


        try {


        } catch (error) {
            console.error('ERR details', error)
            res.sendStatus(400)
        }

    },
}
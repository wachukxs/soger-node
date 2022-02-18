const db = require('../utils/db')

module.exports = {
    // get ratings and no. of comments?
    async createOrder(req, res) {

        console.log('what was searched', req.query);


        try {


        } catch (error) {
            console.error('ERR details', error)
            res.sendStatus(400)
        }

    },


    async getAll(req, res) {

        console.log('what was searched', req.query);


        try {
            // sql select statment
            let sql = "SELECT `ProductName`, `UnitPrice`, `IsVegan` FROM `Product`";

            db.connection.query(sql, function (error, results, fields) {

                if (error) {
                    res.sendStatus(400)
                } else {
                    res.send(results);
                }

            })

        } catch (error) {
            console.error('ERR details', error)
            res.sendStatus(400)
        }

    },

    async addToOrder(req, res) {

        console.log('what was searched', req.query);


        try {


        } catch (error) {
            console.error('ERR details', error)
            res.sendStatus(400)
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
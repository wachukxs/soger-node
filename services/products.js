
const db = require('../utils/db')

module.exports = {
    // get ratings and no. of comments?
    async getAll(req, res) {

        console.log('what was products.getAll', req.query);


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
            res.sendStatus(500)
        }

    },


    async getSingle(req, res) {

        try {
            let sql = "SELECT `ProductName`, `UnitPrice`, `IsVegan` FROM `Product` WHERE `ProductId` = ?"
            
            db.connection.query(sql, [req.params.id], function (error, results, fields) {

                if (error) {
                    res.sendStatus(400)
                } else if (results.length > 0) {
                    res.send(results);
                } else { // if id does not exists
                    res.sendStatus(404)
                }

            })

        } catch (error) {
            console.error('ERR details', error)
            res.sendStatus(500)
        }

    },
}
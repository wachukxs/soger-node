const db = require('../utils/db')

module.exports = {
    // get ratings and no. of comments?
    async createOrder(req, res) {

        console.log('what was passed', req.body);

        
        try {

            // since we're running multiple transactions ... we should roll back if one of them fails

            // OrderItem
            let sql = "INSERT INTO `Order` (`OrderNumber`, `CustomerId`, `TotalAmount`) VALUES ((SELECT * FROM (SELECT CONVERT(`OrderNumber`, UNSIGNED) + 1 FROM `Order` ORDER BY `OrderId` DESC LIMIT 1) Order_Num), ?, ?)";
            /**
             * 
             * what was passed {
                CustomerId: 1,
                products: [
                    { ProductId: 2, Quantity: 3 },
                    { ProductId: 3, Quantity: 45 },
                    { ProductId: 1, Quantity: 23 }
                ]
                }

             */

            db.connection.query(sql, [req.body.CustomerId, 0], function (error, results, fields) {

                if (error) {
                    console.log('err: woosh', error);
                    res.sendStatus(400)
                } else {
                    // if an error throws here, we should handle it
                    let _OrderId = results.insertId

                    sql = "INSERT INTO `OrderItem` (`ProductId`, `Quantity`, `UnitPrice`, `OrderId`) VALUES ?"

                    let newValue = req.body.products.map(_v => Object.values(({..._v, UnitPrice: 0, OrderId: _OrderId }))) // to do, unitPrice, select prince for product
                    db.connection.query(sql, [newValue], async function (error, results, fields) {

                        if (error) {
                            console.log('err: 344', error);
                            res.sendStatus(400)
                        } else {
                            // if an error throws here, we should handle it

                            // query database
                            const [rows1, fields1] = await db.connection.promise().query('UPDATE OrderItem SET `UnitPrice` = (SELECT UnitPrice FROM `Product` WHERE Product.`ProductId` = OrderItem.ProductId) WHERE OrderId = ?', [_OrderId]);
                            console.log('rows1', rows1, 'fields1', fields1);

                        
                            const [rows2, fields2] = await db.connection.promise().query('UPDATE `Order` SET `TotalAmount` = (SELECT SUM(OI.`UnitPrice` * OI.`Quantity`) FROM `Product` P RIGHT JOIN OrderItem OI ON OI.ProductId = P.ProductId WHERE OI.`OrderId` = ?) WHERE `OrderId` = ?', [_OrderId, _OrderId]);

                            console.log('rows2', rows2, 'fields2', fields2);
                            // run update on UnitPrice in OrderItem
                            // run update on TotalAmount in Order
        
                            res.sendStatus(200);
                        }
        
                    })

                }

            })

        } catch (error) {
            console.error('ERR details', error)
            res.sendStatus(500)
        }

    },


    async getAll(req, res) {

        console.log('what was getAll', req.query);


        try {
            

        } catch (error) {
            console.error('ERR details', error)
            res.sendStatus(500)
        }

    },

    async addToOrder(req, res) {

        console.log('what was addToOrder', req.query);


        try {


        } catch (error) {
            console.error('ERR details', error)
            res.sendStatus(500)
        }

    },

    async getReport(req, res) {

        console.log('what was getReport', req.query);


        try {


        } catch (error) {
            console.error('ERR details', error)
            res.sendStatus(400)
        }

    },
}
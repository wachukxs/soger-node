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
             * 
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
            // sql select statment
            // filterable by start and end date and is vegan
            let sql = " \
                SELECT *, `Order`.`CustomerId`, `Order`.`OrderDate`, `Order`.`DeliveryDate`, `Order`.`TotalAmount` FROM `OrderItem` \
                RIGHT OUTER JOIN \
                `Order` \
                ON \
                `Order`.`OrderId` = `OrderItem`.`OrderId` \
                RIGHT OUTER JOIN \
                `Product` \
                ON \
                `OrderItem`.`ProductId` = `Product`.`ProductId` \
            ";

            // TODO: improve
            if (Object.keys(req.query).length > 0) {
                sql += (req.query.filterBy && req.query.filterBy == "OrderDate" ? " WHERE \`OrderDate\` " + (req.query.minValue ? ` > "${req.query.minValue}" ` + (req.query.maxValue ? ` ${ req.query.maxValue && req.query.minValue ? ' AND \`OrderDate\` ' : ''} < "${req.query.maxValue}" ` : '') : '') 
                : ''
                )


                // check that 
                sql += (req.query.filterBy && req.query.filterBy == "IsVegan" ? " WHERE \`Product\`.\`IsVegan\` " + (req.query.minValue ? ` = ${Boolean(req.query.minValue)} ` : '') : '')

                // do order by later
            }
            // WHERE `Order`.`OrderDate` > "2021-12-31T21:00:00.000Z"

            db.connection.query(sql, function (error, results, fields) {

                if (error) {
                    console.log('err: orders.getAll', error);
                    res.sendStatus(400)
                } else {
                    console.log('query that ran', sql);
                    // we should send more info about the response we're sending. result count, etc.
                    res.send(results);
                }

            })

        } catch (error) {
            console.error('ERR details', error)
            res.sendStatus(500)
        }

    },

    async addToOrder(req, res) {

        console.log('what was addToOrder', req.body);
        // req.params.id

        // insert new order items, the re-calculate total


        try {

            let sql = "INSERT INTO `OrderItem` (`ProductId`, `Quantity`, `UnitPrice`, `OrderId`) VALUES ?";
            let _OrderId = Number(req.params.id)

                    let newValue = req.body.products.map(_v => Object.values(({..._v, UnitPrice: 0, OrderId: _OrderId }))) // to do, unitPrice, select prince for product
                    db.connection.query(sql, [newValue], async function (error, results, fields) {

                        if (error) {
                            console.log('err: 344', error);
                            if (error.code == "ER_DUP_ENTRY") {
                                res.status(400).send({message: "One of the Product already exists in the selected order. Only include products that do not exists in an order. Or update the product details in the selected order"})
                            } else {
                                res.sendStatus(400)
                            }
                            
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

        } catch (error) {
            console.error('ERR details', error)
            res.sendStatus(500)
        }

    },

    // not a basic requirement
    async editOrderItem(req, res) {

        console.log('what was editOrderItem', req.query);


        try {


        } catch (error) {
            console.error('ERR details', error)
            res.sendStatus(400)
        }

    },

    async getReport(req, res) {

        console.log('what was getReport', req.query);


        try {

            // run multiple queries
            // vegan
            let sql = " \
                SELECT `Order`.`OrderId`,`OrderNumber`,`CustomerId`,`OrderDate`,`DeliveryDate`,`TotalAmount` FROM `Order` \
                RIGHT JOIN \
                `OrderItem` \
                ON \
                `Order`.`OrderId` = `OrderItem`.`OrderId` \
                RIGHT JOIN \
                `Product` \
                ON \
                `OrderItem`.`ProductId` = `Product`.`ProductId` \
                WHERE `Product`.`IsVegan` = true \
            ";

            sql += "; SELECT CustomerId, SUM(`TotalAmount`) AS TotalAmount FROM `Order` WHERE OrderDate BETWEEN '2022-01-01 00:00:00' AND '2022-01-31 00:00:00'  GROUP BY `CustomerId`  ORDER BY `TotalAmount` DESC LIMIT 5"


            db.connection.query(sql, function (error, results, fields) {

                if (error) {
                    console.log('err: orders.getReport', error);
                    res.sendStatus(400)
                } else {
                    console.log('query that ran', sql);
                    // we should send more info about the response we're sending. result count, etc.
                    res.send({
                        vaganOrder: results[0],
                        bigMonthlySpeder: results[1]
                    });
                }

            })

        } catch (error) {
            console.error('ERR details', error)
            res.sendStatus(400)
        }

    },
}
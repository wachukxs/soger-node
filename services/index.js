const productsService = require('./products');
const ordersService = require('./orders');

/**
 * later, Automatically export by file name like sequelize's models folder is exported
 */
module.exports = {
    productsService,
    ordersService,
}
let express = require('express');
let router = express.Router();

const services = require('../services')

router.get('/orders', express.json(), services.ordersService.getAll);

router.post('/orders/:ID', express.json(), services.ordersService.addToOrder);

router.get('/orders/:ID/report', express.json(), services.ordersService.getReport);

router.get('/orders/new', express.json(), services.ordersService.createOrder);

module.exports = router;
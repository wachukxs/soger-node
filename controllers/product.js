let express = require('express');
let router = express.Router();

const services = require('../services')

router.get('/products', express.json(), services.productsService.getAll);

router.get('/products/:id', express.json(), services.productsService.getSingle);

module.exports = router;
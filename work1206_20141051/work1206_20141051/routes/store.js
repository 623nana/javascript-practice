var express = require('express');
var router = express.Router();

var products = require('../products');

router.get('/', function (request, response) {
    response.render('store', {products: products})
});


module.exports = router;

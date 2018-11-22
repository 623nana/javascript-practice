var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('test', { title: 'Test', hello: '테스트입니당' });
});

module.exports = router;

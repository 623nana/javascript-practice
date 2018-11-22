var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var client = mysql.createConnection({
  user: 'root',
  port: 3306,
  password: '',
  database: 'python_lab'
});


/* GET users listing. */
router.get('/', function(req, res, next) {
  /* SELECT */
  client.query('select * from user', function(error, result){
    res.send(result);
  });
});

router.get('/insert', function(req, res, next){
    /* INSERT */
  client.query('INSERT INTO user (id, password, nickname) VALUES (?, ?, ?)', ['hhhhh', '5000', 'hello'], function(error, fields){});
  client.query('select * from user', function(error, result){
    res.send(result);
  });
});

router.get('/delete', function(req, res, next){
 /* DELETE */
 client.query('delete from user where id = ?', ["hhhhh"], function(error, result){});
 client.query('select * from user', function(error, result){
  res.send(result);
  });
});

router.get('/update', function(req, res, next){
    /* UPDATE*/
    client.query('update user set nickname=\'빅데이터\' where id = ?' ,['hhyuck'], function(error, result){});
    client.query('select * from user', function(error, result){
      res.send(result);
    });
});

module.exports = router;

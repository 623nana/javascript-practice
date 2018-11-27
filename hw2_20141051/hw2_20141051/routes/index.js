var express = require('express');
var router = express.Router();
var session = require('express-session');
var mysql = require('mysql');

var client = mysql.createConnection({
  user: 'root',
  port: 3306,
  password: 'rmehd1215',
  database: 'python_lab'
});

router.use(session({
  key: 'sid',
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 600*1000
  }
}));

router.get('/', function(req, res) {
  client.query('select * from product', function(error, rslt){
    res.render('login', {rslt:rslt, session: req.session});
  });
});

router.post('/login', function(req, res) {
  var id = req.body.id;
  var pw = req.body.pw;
  if((/^[a-zA-Z0-9!^]{5,10}$/).test(id)&&(/^(?=.*[a-zA-Z])((?=.*[0-9])|(?=.*[!^]))[a-zA-Z0-9!^].{5,10}$/).test(pw)){
    req.session.login = true;
    req.session.id = req.body.id;
    req.session.pw = req.body.pw;
    res.render('login', {id: req.body.id, session:req.session});
  }else{
      res.send("<h1>다시 로그인해주세요.</h1>")    
  }
})

router.get('/logout', function(req, res) {
  req.session.destroy();
  res.redirect('/');
});

router.post('/insert', function(req, res){
  console.log(req.body.pName);
  var name = req.body.pName;
  var weight = req.body.pWeight;
  var price = req.body.pPrice;
  client.query('INSERT INTO product (name, weight, price) VALUES (?, ?, ?)', [name, weight, price], function(error, fields){});
  res.render('login', {id: req.body.id, session:req.session});
});

router.post('/select', function(req, res, next) {
  /* SELECT */
  client.query('select * from product', function(error, rslt){
    console.log(rslt);
    res.send(rslt);
  });
});

router.get('/calculate', function(req, res){
  client.query('select * from product', function(error, product){
    res.send(product);
  });
})

module.exports = router;

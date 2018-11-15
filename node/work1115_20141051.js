var express = require('express');
var app = new express();

var bodyParser = require('body-parser');
var morgan = require('morgan');

var fs = require('fs');
var session = require('express-session');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

var routerA = express.Router();
var routerB = express.Router();

app.use(morgan('URL: :url'));

routerA.get('/index', function(req, res){
    res.send('<h1>RouterA</h1>');
});

routerA.get('/router', function(req, res){
    res.send('<h1>Router</h1>');
});

routerB.get('/index', function(req, res){
    res.send('<h1>RouterB</h1>');
});

routerB.get("/image",function(req,res){
    res.send('<img src="/img/image.png"/>');
});

app.use('/a', routerA);
app.use('/b', routerB);

app.get('/login', function(req,res){
    fs.readFile('/public/login.html', 'utf-8', function(err, data){
        if(err){
            res.send(err);
        } else {
            res.send(data);
        }
    });
});

app.use(session({
    secret: '123',
    resave: false,
    saveUninitialized: true
}));

app.post('/login', function(req, res){
    var login = req.body.login;
    var passwd = req.body.passwd;
    if((/^[a-zA-Z0-9!^]{5,10}$/).test(login)&&(/^(?=.*[a-zA-Z])((?=.*[0-9])|(?=.*[!^]))[a-zA-Z0-9!^].{5,10}$/).test(passwd)){
        res.send("<h1>로그인 되었습니다!</h1><h1>" + login + "님 환영합니다!</h1>");
    }else{
        res.send("<h1>다시 로그인해주세요.</h1>")    
    }
});

app.get('/logout', function(req, res){
    if(req.session){
        req.session.destroy(function(err){
            if(err){
                console.log(err);
            }else{
                res.redirect('/login');
            }
        })
    }else{
        res.redirect('/login');
    }
});

app.listen(8080, function(){
    console.log('Server Funning at http://127.0.0.1:8080')   
});
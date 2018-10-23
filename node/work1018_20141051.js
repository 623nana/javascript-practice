// var os = require('os');

// var output = "";
// for(var i = 0; i < 10; i++){
//     console.log(output+='*');
// }

// console.log('filename:', __filename);
// console.log('dirmanme:', __dirname);

// console.log(os.hostname());
// console.log(os.platform());

var http = require('http');
var express = require('express');
var app = new express();
var bodyParser = require('body-parser');
app.use(express.static('public'));

var items = [
    {name: '우유', price: '2000'},
    {name: '홍차', price: '5000'},
    {name: '커피', price: '5000'},
];
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
// app.use(function(request, response){
//     response.send('<h1>안녕</h1>');
// });

// app.use(function(req, res, next){
//     console.log('first');
//     next();
// });

// app.use(function(req, res, next){
//     console.log('second');
//     next();
// });

// app.use(function(req, res, next){
//     res.send('<h1>Hello Middleware...</h1>');
// });

app.all('/data.html', function(req, res){
    // res.send('<h1>PageA</h1>');
    var output = "";
    output += '<!doctype html>';
    output += '<html>';
    output += '<head>';
    output += '<title>Data HTML</title>';
    output += '</head>';
    output += '<body>';
    items.forEach(function (item){
        output += '<div>';
        output += '<h1>' + item.name + '</h1>';
        output += '<h2>' + item.price + '</h2>';
        output += '</div>';

    });
    output += '</body>';
    output += '</html>';
    res.send(output);
});

app.all('/data.xml', function(req, res){
    var output = '';
    output += '<?xml version="1.0" encoding="UTF-8" ?>';
    output += '<products>';

    items.forEach(function (item){
        output += '<product>';
        output += '<name>' + item.name + '</name>';
        output += '<price>' + item.price + '</price>';
        output += '</product>';
    });
    output += '</products>';
    // res.type('text/xml');
    res.send(output);
});


app.all('/data.json', function(req, res){
    res.send(items);
});

app.all('/param/:id', function(req, res){
    // http://127.0.0.1:52273/param/아이디
    var idx = req.params.id;
    res.send('<h1>' + idx + '</h1>');
});

app.all('/param', function(req, res){
    // http://127.0.0.1:52273/param?name=gg&&region=seoul
    var n = req.query['name'];
    var r = req.query['region'];
    res.send('<h1>' + n + ' ' + r + '</h1>');
});


// app.listen(52273, function(){
//     console.log('Server Running at http://127.0.0.1:52273');
// });

http.createServer(app).listen(52273, function(){
    console.log('Running at http://127.0.0.1:52273');
});
var express = require('express');
var bodyParser = require('body-parser');
var app = new express();
var products = [];

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/favicon.ico', function(req, res){
    res.sendStatus(204);
});

app.post('/products', function(req, res){
    console.log("app.post");
    var name =  req.body.name;
    var weight = req.body.weight;
    var price = req.body.price;

    if(name && weight && price){
        var pro = {
            name: name,
            weight: weight,
            price: price
        };
        products.push(pro);
    }
    console.log("-----", products);

    res.send(products);
});

app.get('/calculate', function(req, res){
    res.send(products);
})

app.listen(8080, function(){
    console.log('서버...');
});
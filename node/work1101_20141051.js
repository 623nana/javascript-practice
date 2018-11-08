var express = require('express');
var bodyParser = require('body-parser');
var app = new express();
var items = [
    {name: '우유', price: '2000'},
    {name: '홍차', price: '5000'},
    {name: '커피', price: '5000'},
];

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/favicon.ico', function(req, res){
    res.sendStatus(204);
});

app.all('/data.html', function(req, res){
    console.log('호출');
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

app.all('/data.json', function(req, res){
    console.log('호출');
    res.send(items);
});

app.all('/data.xml', function(request, response){
    var output = '';
    output += '<?xml version="1.0" encoding="UTF-8" ?>';
    output += '<products>';
    items.forEach(function (item) {
        output += '<product>';
        output += '    <name>' + item.name + '</name>';
        output += '    <price>' + item.price + '</price>';
        output += '</product>';
    });
    output += '</products>';
    response.type('text/xml');
    response.send(output);
});

app.get('/products', function (request, response) {
    console.log("app.get");
    var name = request.query["name"];
    var price = request.query["price"];
    if (name && price ) {
        var item = {
            name: name,
            price: price
        };    
        items.push(item);
    }
    console.log("-----", items);
    response.send(items);

});

app.get('/products/:id', function (request, response) {
    console.log("app.get :id");
    // 변수를 선언합니다.
    var id = Number(request.params.id);
    if (isNaN(id)) {
        // 오류: 잘못된 경로
        response.send({
            error: '숫자를 입력하세요!'
        });
    } else if (items[id]) {
        // 정상
        response.send(items[id]);
    } else {
        // 오류: 요소가 없을 경우
        response.send({
            error: '존재하지 않는 데이터입니다!'
        });
    }
});

app.post('/products', function (request, response) {
    // 변수를 선언합니다.
    console.log("app.post");
    var name = request.body.name;
    var price = request.body.price;
    //console.log(request);
    if (name && price ) {
        var item = {
            name: name,
            price: price
        };
        // 데이터를 추가합니다.
        items.push(item);
    }
    console.log("-----", items);
    // 응답합니다.
    response.send({
        message: '데이터를 추가했습니다.',
        data: item
    });
});

// 실습
app.all('/data.csv', function(request, response){
    var output = '';
    output+= '20141051,111,1111\n';
    output+= '20141051,222,2222\n';
    output+= '20141051,333,3333';
    response.send(output);
});

app.listen(8080, function(){
    console.log('서버...');
});
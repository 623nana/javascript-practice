var express = require('express');
var app = new express();
app.use(express.static('public'));

app.all('/square/:num', function(req, res){
    // http://127.0.0.1:52273/param/아이디
    var idx = req.params.num;
    var isNumeric = true;
    var ch;
    for(var i = 0; i<idx.length; i++){
        ch = idx.charAt(i);
        if(!((ch>='0') && (ch<='9')))
            isNumeric = false;
    }
    if(isNumeric == false)
        res.send('<h1>숫자를 입력하세요!</h1>');
    else{
        var rslt = idx*idx
        res.send('<h1>결과:' + rslt + '</h1>');
    }
});

app.listen(8080, function(){
    console.log('Server Running at http://127.0.0.1:8080');
    console.log('----학번:1811111 이름:홍길순----')
});
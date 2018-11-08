// console 객체
console.time('timecheck');
var out = 1;
for(var i = 1; i<=10; i++){
    out*=1;
}

console.log('숫자%d, 문자%s, 시간측정%j',  100.1122, 'strings', { greeting: 'hello!' });
console.log('result:', out);
console.timeEnd('timecheck');

// process 객체
console.log('version', process.version);
console.log('versions', process.versions);
console.log('arch', process.arch);
console.log('platform', process.platform);
process.argv.forEach(function(item, idx){
    console.log(idx+ ' : '+ typeof(item) + ' : ', item);
    if(item == '--exit'){
        var exitTime = Number(process.argv[idx+1]);
        setTimeout(function(){
            process.exit();
        }, exitTime);
    }
});

process.setMaxListeners(5); // 이벤트 연결 개수 제한
// process 객체에 exit 이벤트를 연결합니다.
process.on('exit', function(code){
    console.log('Bye...');
});

process.emit('exit');


var onUncaughtException = function(error){
    console.log('예외발생!!!', error.name);
    // process.removeListener('uncaughtException', onUncaughtException);
};

// process.on('uncaughtException', function(error){
//     console.log('예외가 발생했군..');
// });


// process.on('uncaughtException', onUncaughtException);

var cnt = 0;
var test = function(){
    cnt+=1;
    console.log(cnt);
    if(cnt > 3) return;
    setTimeout(test,2000);
    try{
        error.error.error();
    }catch (error){
        console.log('에러발생!');
    }
};

setTimeout(test, 2000);

// 이벤트 연결
// var events = require('events');
// var custom = new events();
// custom.on('tick', function(code){
//     console.log('이벤트 실행');
// });

// custom.emit('tick');

var module = require('./module.js');
console.log('abs: ', module.abs(-12));
console.log(module.print('안녕~'));


var url = require('url');

var parseObject = url.parse('https://github.com/623nana');
console.log(parseObject);
console.log(parseObject.pathname);
console.log(url.resolve(parseObject.pathname, 'test'));
console.log(parseObject.href, '/test');

var parseObj = url.parse('https://github.com/623nana?h=111');
var queryString = require('querystring');

console.log(parseObj.query);
console.log(queryString.parse(parseObj.query));

var util = require('util');

var data = util.format('%d + %d = %d', 52, 273, 52+273);
console.log(data);
console.log(util.format('%s:%s', 'foo'));
console.log(util.format('%s:%s', 'foo', 'bar', 'baz'));

console.log(queryString.stringify({foo : 'bar', bax:'qux'}, ';', ':'))

var fs = require('fs');

fs.readFile('./files/textfile.txt', 'utf8', function(error, data){
    console.log('내용1==>', data);
});

var txt = fs.readFileSync('./files/textfile.txt', 'utf8');
console.log('내용2==>', txt);

var d = 'Hello World...!';

fs.writeFile('./files/textWrite.txt', d, 'utf8', function(error){
    console.log('Write File Async Complete');
});

fs.writeFileSync('./files/textWriteSync.txt', d, 'utf8');
console.log('Write file Sync Complete');




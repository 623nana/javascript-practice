var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('lobby');
});

router.get('/canvas/:room', function (req, res) {
    res.render('canvas', {room: req.params.room});
});

router.get('/room', function (req, res) {
    try{
        var io = req.app.get('socket');
    if(io) console.log(io.sockets.adapter.rooms);
    else console.log('없음');
    var rooms = Object.keys(io.sockets.adapter.rooms).filter(function (item) {
        return item.indexOf('/') < 0;
    })
    res.send(rooms);
    } catch(e){
        console.log(e);
        throw e;
    }
});

module.exports = router;

module.exports = function(io, products){
    io.sockets.on('connection', function (socket) {
        // �Լ��� �����մϴ�.
        function onReturn(index) {
            // ���� ������ ������ŵ�ϴ�.
            products[index].count++;
    
            // Ÿ�̸Ӹ� �����մϴ�.
            clearTimeout(cart[index].timerID);
    
            // īƮ���� ������ �����մϴ�.
            delete cart[index];
    
            // count �̺�Ʈ�� �߻���ŵ�ϴ�.
            io.sockets.emit('count', {
                index: index,
                count: products[index].count
            });
        };
    
        // ������ �����մϴ�.
        var cart = {};
    
        // cart �̺�Ʈ 
        socket.on('cart', function (index) {
            // ���� ������ ���ҽ�ŵ�ϴ�.
            products[index].count--;
    
            // īƮ�� ������ �ְ� Ÿ�̸Ӹ� �����մϴ�.
            cart[index] = {};
            cart[index].index = index;
            cart[index].timerID = setTimeout(function () {
                onReturn(index);
            }, 1000 * 60 * 10);
    
            // count �̺�Ʈ�� �߻���ŵ�ϴ�.
            io.sockets.emit('count', {
                index: index,
                count: products[index].count
            });
        });
        // buy �̺�Ʈ
        socket.on('buy', function (index) {
            // Ÿ�̸Ӹ� �����մϴ�.
            clearTimeout(cart[index].timerID);
    
            // īƮ���� ������ �����մϴ�.
            delete cart[index];
    
            // count �̺�Ʈ�� �߻���ŵ�ϴ�.
            io.sockets.emit('count', {
                index: index,
                count: products[index].count
            });
        });
        // return �̺�Ʈ
        socket.on('return', function (index) {
            onReturn(index);
        });


        // 실시간 위치추적
        var client = require('./db_connection');

        socket.on('join', function (data) {
            socket.join(data);
          });
          // location �̺�Ʈ
          socket.on('location', function (data) {
            // �����͸� �����մϴ�.
            client.query('INSERT INTO locations(name, latitude, longitude, date) VALUES (?, ?, ?, NOW())', [data.name, data.latitude, data.longitude]);
            // receive �̺�Ʈ�� �߻���ŵ�ϴ�.            
            io.sockets.in(data.name).emit('receive', {
              latitude: data.latitude,
              longitude: data.longitude,
              date: Date.now()
            });
          });

        // 그림판
        var roomId = "";

        socket.on('join', function (data) {
            socket.join(data);
            roomId = data;
        });
        socket.on('draw', function (data) {
            io.sockets.in(roomId).emit('line', data);
        });
        socket.on('create_room', function (data) {
            io.sockets.emit('create_room', data.toString());
        });
    });
}
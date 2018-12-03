module.exports = function(io, seats) {
    io.sockets.on("connection", function(socket) {
      socket.on("reserve", function(data) {
        seats[data.y][data.x] = 2;
        io.sockets.emit("reserve", data);
      });
  
      // 실습
      var roomName = null;
      socket.on("join", function(data) {
        console.log("roomName : ", data);
        roomName = data;
        socket.join(data);
      });
      socket.on("message", function(data) {
        io.sockets.in(roomName).emit("message", data);
      });
    });
  };
  
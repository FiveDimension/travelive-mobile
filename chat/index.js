var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var request = require('request');

app.get('/', function(req, res){
  res.sendfile('index.html');
});

app.get('/viewer', function(req, res){
  res.sendfile('viewer.html');
});

app.get('/jquery.js', function(req, res){
  res.sendfile('node_modules/jquery/dist/jquery.min.js');
});

io.on('connection', function(socket){
  var user = undefined, room = undefined;

  socket.on('join room', function(data){
    socket.join(data.room);
    user = data.user;
    room = data.room;

    console.log('join room', room, user);
  });

  socket.on('new message', function(msg){
    console.log('message: ' + msg);
    console.log(room, user, msg);
    io.to(room).emit('receive message', {
      msg: msg,
      user: user
    });
  });

  socket.on('new like', function(){
    console.log('like:', room, user);

    request({
      method: 'POST',
      url: 'http://58.40.126.144/api/doFavorite',
      headers: {
        'Content-Type': 'application/json'
      },
      json: {st_id: room}
    }, function (error, response, body) {
      if (!error) {
        console.log(body);
      }
      else {
        console.log('Error happened: ' + error);
      }
    });

    io.to(room).emit('receive like', {
      user: user
    });
  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

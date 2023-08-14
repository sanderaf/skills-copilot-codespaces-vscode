// Create web server and socket.io
var app = express();
var server = http.createServer(app);
var io = socketio.listen(server);

// Serve static files
app.use(express.static(__dirname + '/public'));

// Listen on port 3000
server.listen(3000, function() {
  console.log('listening on *:3000');
});

// Create a new instance of the game
var game = new Game();

// Listen for connections
io.on('connection', function(socket) {
  console.log('a user connected');

  // Listen for a new player
  socket.on('new player', function() {
    game.addPlayer(socket.id);
    console.log('new player: ' + socket.id);
  });

  // Listen for player movement
  socket.on('player movement', function(data) {
    game.movePlayer(socket.id, data);
  });

  // Listen for player disconnection
  socket.on('disconnect', function() {
    game.removePlayer(socket.id);
    console.log('user disconnected');
  });
});

// Start the game loop
setInterval(function() {
  game.update();
  io.sockets.emit('state', game.getState());
}, 1000 / 60);

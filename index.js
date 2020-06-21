const Server = require('./System/Server');
const ServerConfig = require('./System/Config');
const ConsoleMsg = require('./System/Msg');
let server = new Server();


server.init();
const SocketIO = require('socket.io')(ServerConfig.Config.Port);

new ConsoleMsg("Server started on port " + ServerConfig.Config.Port);



SocketIO.on('connection', (socket) => {
    let connection = server.onConnected(socket);
    socket.emit('register',{id:connection.player.id});

    socket.broadcast.emit('spawn', connection.player);
    //console.log(SocketIO.sockets.connected[socket.id]);
    socket.to(socket.id).emit('spawnOthers', connection.server.players);

    //console.log('spawnOthers');
    //console.log(connection.server.players);

    connection.createEvents();

});
const Server = require('./System/Server');
const ServerConfig = require('./System/Config');
const ConsoleMsg = require('./System/Msg');
let server = new Server();

const SocketIO = require('socket.io')(ServerConfig.Config.Port);
server.init();
new ConsoleMsg("Server started on port " + ServerConfig.Config.Port);



SocketIO.on('connection', (socket) => {
    let connection = server.onConnected(socket);
    socket.emit('register',{id:connection.player.id});
    connection.createEvents();
    socket.on('test',(e) => {
        console.log(e);
    })
});
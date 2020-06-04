const ServerConfig = require('./System/Config');
const ConsoleMsg = require('./System/Msg');
new ConsoleMsg('Preparing the server', 'info');

const SocketIO = require('socket.io')(ServerConfig.Config.Port);
const Server = require('./System/Server');

new ConsoleMsg('Server started on port ' + ServerConfig.Config.Port);

let server = new Server();
SocketIO.on('connection', (socket) => {
    new ConsoleMsg('Connection recieved.');

    socket.on('disconnect', () => {
        new ConsoleMsg('Player disconnected.');
    });
});
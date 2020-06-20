module.exports = class Connection {
    socket;
    player;
    server;
    room;


    constructor() {

    }

    createEvents() {
        let connection = this;
        let socket = connection.socket;
        let server = connection.server;
        let player = connection.player;


        socket.emit('spawn', this.connection.player);
        socket.broadcast.emit('spawn', this.connection.player);

        socket.on('disconnect', () => {
            server.onDisconnected(connection);
        });
    }
}
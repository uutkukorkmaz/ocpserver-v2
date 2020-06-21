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



        socket.on('updatePosition',(e) => {
            player.position.x = e.vector.x;
            player.position.y = e.vector.y;
            player.position.z = e.vector.z;
            socket.broadcast.emit('updatePosition',e);
        });

        socket.on('disconnect', () => {
            server.onDisconnected(connection);
        });
    }
}
module.exports = class Connection {
    socket;
    player;
    server;
    room;


    constructor() {

    }

    createEvents(IO) {
        let connection = this;
        let socket = connection.socket;
        let server = connection.server;
        let player = connection.player;


//        console.log(server.players[Object.keys(server.players)[0]]);
        socket.broadcast.emit('spawn', player);
        IO.sockets[socket.id].emit('spawnOthers', this.players);
        console.log('spawnOthers');
        console.log(server.players)

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
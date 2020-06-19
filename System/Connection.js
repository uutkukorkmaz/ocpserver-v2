module.exports = class Connection {
    socket;
    player;
    server;
    room;


    constructor (){

    }

    createEvents(){
        let connection = this;
        let socket = connection.socket;
        let server = connection.server;
        let player = connection.player;


        server.spawnPlayers(this.room);

        socket.on('disconnect', () => {
            server.onDisconnected(connection);
        });
    }
}
module.exports = class Connection {
    socket;
    player;
    server;


    constructor (){

    }

    createEvents(){
        let connection = this;
        let socket = connection.socket;
        let server = connection.server;
        let player = connection.player;

        socket.on('disconnect', () => {
            server.onDisconnected(connection);
        });
    }
}
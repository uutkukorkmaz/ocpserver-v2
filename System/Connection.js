const Msg = require('./Msg')
const Database = require('./Database')

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

        
            this.Spawn();

            socket.on('positionUpdate', (data) => {
                this.updatePosition(data);
            });

            socket.on('disconnect', () => {
                server.onDisconnected(connection);
            });
       
    }

    Spawn() {
        let connection = this;
        let socket = connection.socket;
        let server = connection.server;
        let player = connection.player;

        socket.broadcast.emit('spawn', player);
        for (let PlayerID in server.players) {
            if (PlayerID != player.id && server.players[PlayerID].room == player.room) {
                socket.emit('spawn', server.players[PlayerID]);
            }

        }
    }

    updatePosition(data) {
        let connection = this;
        let socket = connection.socket;
        let server = connection.server;
        let player = connection.player;

        player.position = data.vector;
        server.players[player.id].position = player.position;
        socket.broadcast.emit('positionUpdate', player);

    }

}

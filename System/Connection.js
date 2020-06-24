const Msg = require('./Msg')

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

        socket.on('test',(data) => {
            console.log(data);
        })

        socket.on('positionUpdate',(data) => {
           //this.updatePosition(data);
            new Msg("positionUpdate incoming data -> " + JSON.stringify(data),"info",false,"DEBUG");
            player.position = data.vector;
            server.players[player.id].position = player.position;
            new Msg("positionUpdate server player object -> "+server.players[player.id],"info",false,"DEBUG");
            socket.broadcast.emit('positionUpdate',data);
            socket.broadcast.emit('positionUpdate',player);
        });

        socket.on('disconnect', () => {
           server.onDisconnected(connection);
        });
    }

    Spawn(){
        let connection = this;
        let socket = connection.socket;
        let server = connection.server;
        let player = connection.player;

        socket.broadcast.emit('spawn', player);
        for(let PlayerID in server.players){
            if(PlayerID != player.id && server.players[PlayerID].room == player.room) {
                socket.emit('spawn', server.players[PlayerID]);
            }

        }
    }

    updatePosition(data){
        let connection = this;
        let socket = connection.socket;
        let server = connection.server;
        let player = connection.player;

        player.position = data.vector;
        console.log(data);
        server.players[player.id].position = player.position;
        socket.broadcast.emit('positionUpdate',data);

    }

}
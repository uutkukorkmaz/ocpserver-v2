const Msg = require('./Msg')
const Database = require('./Database')

module.exports = class Connection {
    socket;
    player;
    server;
    room;
    loggedIn = false;


    constructor() {

    }

    createEvents() {
        let connection = this;
        let socket = connection.socket;
        let server = connection.server;
        let player = connection.player;

        if (this.loggedIn) {
            this.Spawn();

            socket.on('positionUpdate', (data) => {
                this.updatePosition(data);
            });

            socket.on('disconnect', () => {
                server.onDisconnected(connection);
            });
        } else {
            socket.emit('needLogIn');
            socket.on('login',(data)=>{
                this.loggedIn = true;
                new Msg(player.id+" logged in as "+data.username);
            })
        }
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
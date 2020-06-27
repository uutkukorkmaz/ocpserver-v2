const Msg = require('./Msg')

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
        //auth deneme
        //let a = new auth(connection,server);
        //a.setUsername('a').setPassword('a').authorize();


            let db = server.database.con;
            this.Spawn();

            socket.on('positionUpdate', (data) => {
                this.updatePosition(data);
            });

            socket.on('disconnect', () => {
                server.onDisconnected(connection);
            });


            //this.loggedIn = true;

        socket.on('login', (data) => { console.log(data.username,data.password)});
        //socket.emit('needLogIn');
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
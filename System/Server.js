let Connection = require('./Connection');
let Player = require('./Entyties/Player');
module.exports = class Server {

    constructor() {
        this.players = [];
        this.sockets = [];
    }

    onConnected(socket){
        let server = this;
        let connection = new Connection();
        connection.socket = socket;
        connection.player = new Player();
        connection.server = server;

        this.players[connection.player.id] = connection;

        return connection;
    }

}
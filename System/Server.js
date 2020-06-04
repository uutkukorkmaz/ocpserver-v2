let Connection = require('./Connection');
let Msg = require('./Msg');
let Player = require('./Entyties/Player');

module.exports = class Server {

    constructor() {
        this.players = [];
    }

    onConnected(socket){
        let server = this;
        let connection = new Connection();
        connection.socket = socket;
        connection.player = new Player();
        connection.server = server;

        this.players[connection.player.id] = connection;
        new Msg('Player '+connection.player.id+" joined to server.");
        return connection;
    }

    onDisconnected(connection = Connection){
        new ConsoleMsg(Config.ColorRed+'Player '+connection.player.id+" left from server.","error");
        delete this.players[connection.player.id];

    }

}
let Connection = require('./Connection');
let Msg = require('./Msg');
let Cfg = require('./Config');
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
        new Msg('Player '+connection.player.id+" joined to server.","info");
        return connection;
    }

    onDisconnected(connection = Connection){
        new Msg(Config.ColorRed+'Player '+connection.player.id+" left from server.","error");
        delete this.players[connection.player.id];

    }

    init(){
        new Msg('Preparing the server', 'info');
        new Msg('version '+Cfg.Config.ServerVersion, 'info');
    }

}
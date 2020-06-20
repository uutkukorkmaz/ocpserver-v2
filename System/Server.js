let Connection = require('./Connection');
let Msg = require('./Msg');
let Cfg = require('./Config');
let Player = require('./Entities/Player');

module.exports = class Server {

    constructor() {
        this.players = [];
        this.connection = [];
    }

    onConnected(socket) {
        let server = this;
        this.connection = new Connection();
        this.connection.socket = socket;
        this.connection.player = new Player();
        this.connection.server = server;



        //socket.join(this.connection.player.room);
        this.players[this.connection.player.id] = this.connection.player;

       new Msg("Player " + this.connection.player.id + " joined to server.", "processing");
        return this.connection;
    }



    onDisconnected(connection = Connection) {
        new Msg( "Player " + connection.player.id + " left from server.", "error");
        connection.socket.broadcast.emit('playerLeft', connection.player.id);
        delete this.players[connection.player.id];

    }

    init() {
        new Msg("Preparing the server", 'processing');
        new Msg("version " + Cfg.Config.ServerVersion, 'processing');
    }

}
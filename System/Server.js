let Connection = require('./Connection');
let Msg = require('./Msg');
let Cfg = require('./Config');
let Player = require('./Entyties/Player');

module.exports = class Server {

    constructor() {
        this.players = [];
        this.connection = [];
    }

    onConnected(socket){
        let server = this;
        this.connection = new Connection();
        this.connection.socket = socket;
        this.connection.player = new Player();
        this.connection.server = server;
        console.log(this.connection.player);/*
        this.players[this.connection.player.data.id] = this.connection;
        new Msg('Player '+this.connection.player.id+" joined to server.","info");*/
        return this.connection;
    }

    onDisconnected(connection = Connection){
        new Msg(Cfg.Config.ColorRed+'Player '+this.connection.player.id+" left from server.","error");
        delete this.players[this.connection.player.id];

    }

    init(){
        new Msg('Preparing the server', 'info');
        new Msg('version '+Cfg.Config.ServerVersion, 'info');
    }

}
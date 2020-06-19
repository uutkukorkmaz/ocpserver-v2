let Connection = require('./Connection');
let Msg = require('./Msg');
let Cfg = require('./Config');
let Player = require('./Entities/Player');

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

        this.players[this.connection.player.data.id] = this.connection;
        new Msg('Player '+this.connection.player.data.id+" joined to server.","info");
        return this.connection;
    }

    onSpawn(allPlayers){

        //TODO: sunucuya bağlı ve ID'si bana eşit olmayan tüm soketleri broadcast yap...
    }

    onDisconnected(connection = Connection){
        new Msg(Cfg.Config.ColorRed+'Player '+this.connection.player.data.id+" left from server."+Cfg.Config.ColorWhite,"error");
        connection.socket.emit('playerLeft',{id:this.connection.player.data.id});
        delete this.players[this.connection.player.data.id];
    }

    init(){
        new Msg('Preparing the server', 'processing');
        new Msg('version '+Cfg.Config.ServerVersion, 'processing');
    }

}
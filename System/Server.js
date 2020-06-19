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


        socket.join(this.connection.player.room);
        this.players[this.connection.player.id] = this.connection.player;
        new Msg("Player " + this.connection.player.id + " joined to server.", "info");
        return this.connection;
    }

    spawnPlayers(map) {
        for (let playerID in this.players) {
            if (this.players[playerID].room === map) {
                if (this.players[playerID] !== this.connection.player.id) {
                    this.connection.socket.emit('spawn', this.players[playerID])
                } else {
                    this.connection.socket.emit('spawn', this.connection.player);
                    this.connection.socket.broadcast.emit('spawn', this.connection.player);
                }
            }
        }
    }

    onDisconnected(connection = Connection) {
        new Msg(Cfg.Config.ColorRed + "Player " + this.connection.player.id + " left from server." + Cfg.Config.ColorWhite, "error");
        connection.socket.emit('playerLeft', this.connection.player);
        delete this.players[this.connection.player.id];
    }

    init() {
        new Msg("Preparing the server", 'processing');
        new Msg("version " + Cfg.Config.ServerVersion, 'processing');
    }

}
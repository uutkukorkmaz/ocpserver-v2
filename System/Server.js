let Connection = require('./Connection');
let Msg = require('./Msg');
let chalk = require('chalk');
let Cfg = require('./Config');
let Player = require('./Entities/Player');
let Database = require('./Database');


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

        new Msg(this.connection.player.id + " joined to server.", "info");

        // this.database.GetAllRecords("accounts",(err,res) => {
        //    console.log(res);
        // });


        return this.connection;
    }


    onDisconnected(connection = Connection) {
        new Msg(connection.player.id+" left from server","error");
        connection.socket.broadcast.emit('playerLeft',{id:connection.player.id});
        delete this.players[connection.player.id];

    }



    init() {
        new Msg("Current version " + Cfg.Config.ServerVersion, 'info');
        new Msg("Preparing the server", 'processing');
        console.log();

        new Msg("Getting events...", "processing");

        Cfg.events.forEach(e => {
            let func = e.function == "on  "? chalk.green : chalk.magenta;
            let eventText = func(e.function) + " | " + chalk.bold(e.eventName);
            eventText += (typeof e.type == "undefined") ? "" : " -> " + e.type
            new Msg(eventText,"info",false,"OCP EVENT");
        });

        console.log();

        new Msg("Waiting for the MySQL response", "processing");

        this.database = new Database();


    }

}
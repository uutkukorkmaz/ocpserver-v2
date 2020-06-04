let connection = require('./Connection');
let Player = require('./Entyties/Player');
module.exports = class Server {

    constructor() {
        this.players = [];
        this.sockets = [];
    }

    onConnected(socket){
        let server = this;
        let Connection = new connection();
    }

}
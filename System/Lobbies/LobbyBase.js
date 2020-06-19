let Connection = require('../Connection');
let Msg = require('../Msg');

module.exports = class LobbyBase {

    constructor(lobbyID) {
        this.id = lobbyID;
        this.connections = [];
    }

    onUpdate(){

    }

    onJoin(connection = Connection){
        let lobby = this;
        let player = connection.player;
        lobby.connections.push(connection);

        new Msg("Player "+player.data.id+" has joined the lobby "+lobby.id);

        player.room = lobby.id;
        connection.room = lobby.id;
    }

    onLeave(connection = Connection){
        let lobby = this;
        let player = connection.player;

        new Msg("Player "+player.data.id+" has left the lobby "+lobby.id);
        connection.room = undefined;
        let index = lobby.connections.indexOf(connection);
        if(index > -1){
            lobby.connections.splice(index,1);
        }
    }
}
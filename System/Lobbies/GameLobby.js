let LobbyBase = require('./LobbyBase')
let Settings = require('./GameLobbySettings')
let Connection = require('../Connection')

module.exports = class GameLobby extends LobbyBase {
    constructor(id, settings = Settings) {
        super(id);
        this.settings = settings;

    }

    onUpdate() {
        let lobby = this;

    }

    canJoin() {
        return (typeof this.settings.additional.maxPlayers !== "undefined") ?
            this.connections.length + 1 < this.settings.additional.maxPlayers :
            true;
    }

    onJoin(connection = Connection) {
        super.onJoin(connection);
        //this.addPlayer(connection)
    }

    onLeave(connection = Connection) {
        super.onLeave(connection);
        //this.removePlayer(connection)
    }

    addPlayer(connection = Connection) {

    }

    removePlayer(connection = Connection) {

    }
}
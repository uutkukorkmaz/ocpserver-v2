module.exports = class GameLobbySettings {
    constructor(gameMode,spawnPoint,additional=[]) {
        this.gameMode = gameMode;
        if(additional.length > 0){
            this.additional = additional;
        }

    }


}
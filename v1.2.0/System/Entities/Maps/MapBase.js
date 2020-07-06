let config = require('../../../Helpers/config')
let Client = require('../../Client')
module.exports = class MapBase{

    constructor(
        sceneName,
        spawnable = true,
        gameMode = 'default',
        allowPvp = false,
        playerLimit = config.maxPlayerLimit) {
        this.sceneName = sceneName
        this.gameMode = gameMode
        this.allowPvp = allowPvp
        this.playerLimit = playerLimit
        this.connections = []
    }

    onUpdate(){

    }

    canJoin(){
        return (this.playerLimit > this.connections.length+1)
    }

    onJoin(client = Client){
        client.socket.join(this.sceneName)
        client.player.mapObject = this
        client.player.map = this.sceneName
        this.connections[client.id] = client
    }

    onLeave(client = Client){
        client.socket.leave(this.sceneName)
        client.player.mapObject = null
        delete this.connections[client.id]
    }


}
let idg = require('../IDG')
let MapBase = require('./Maps/MapBase')
let Server = require('../Server')
module.exports = class Player {
    objectID
    id
    name
    account
    hp
    maxHP
    mp
    maxMP
    exp
    level
    gold
    map
    mapObject
    position

    constructor(clientID) {
        this.objectID = clientID
    }

    changeMap(newMapObject = MapBase, server = Server) {
        let client = server.connections[this.objectID]
        this.mapObject.onLeave(client)
        newMapObject.onJoin(client)
    }
}
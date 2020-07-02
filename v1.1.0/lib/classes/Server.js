const database = require('./Database')
const Connection = require('./Connection')
const events = require('../events')
const debug = require('../debug')
module.exports = class Server {
    connections = []

    constructor() {
        for( let [key, value] of Object.entries(events)){
            debug.info("Getting events by "+key+" method","application")
           for(let [placeholder,event] of Object.entries(value)){
               debug.log(event,key+" event")
           }
        }
    }

    handshake(connection = Connection){
        this.connections[connection.token] = connection
    }

}
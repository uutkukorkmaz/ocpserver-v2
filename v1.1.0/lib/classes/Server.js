const database = require('./Database')
const Connection = require('./Connection')
const events = require('../events')
const debug = require('../debug')
module.exports = class Server {
    connections = []

    constructor() {
        this.printEvents()
    }

    handshake(connection = Connection){
        this.connections[connection.token] = connection
    }

    async printEvents(){
        for( let [key, value] of Object.entries(events)){
            await debug.info("Getting events by "+key+" method","application")
            for(let [placeholder,event] of Object.entries(value)){
                await debug.log(event,key+" event")
            }
        }
    }

}
/**
 *
 * imports
 *
 * */
let Database = require('./Database')
let Client = require('./Client')
let Player = require('./Entities/Player')
let Maps = require('./Entities/Maps')

/**
 *
 * helpers
 *
 * */
let config = require('../Helpers/config')
let debug = require('../Helpers/debug')
let event = require('../Helpers/events')

/**
 * Handles all connections and events
 * @class Server
 * */
module.exports = class Server {
    /**
     * Contains all connected clients.
     * */
    connections = []

    accounts = []
    /**
     * Contains database handler
     * */
    database
    /**
     *
     * */
    maps = []

    /**
     * Methods
     * */
    constructor() {
        debug.info('Current version ' + config.environment + ' v' + config.version)
        debug.info("Detected environment is " + (config.isLocal ? "local" : "hosted") + " server")
        debug.processing("Preparing to initiate server on " + config.serverIP + ":" + config.port)
        debug.processing("Preparing to connect the database")
        this.database = new Database()
        debug.processing("Preparing maps")
        this.maps = Maps
        this.printEvents()
    }

    onUpdate() {

    }

    onConnected(socket) {
        let server = this
        let client = new Client()
        let player = new Player(client.id)
        client.server = server
        client.socket = socket
        client.player = player
        this.maps.login.onJoin(client)
        this.connections[client.id] = client

        return client;

    }

    checkAccount(token) {
        return this.accounts.indexOf(token) > -1
    }

    accountLoggedIn(token) {
        this.accounts[token.token] = token
    }

    accountLeft(token) {
        if (this.accounts[token] !== undefined)
            delete this.accounts[token]
    }

    printEvents() {
        for (let [key, value] of Object.entries(event)) {
            debug.info("Getting events by '" + key + "' method", "application")
            for (let [placeholder, event] of Object.entries(value)) {
                debug.log(event, key + " event")
            }
        }
    }
}
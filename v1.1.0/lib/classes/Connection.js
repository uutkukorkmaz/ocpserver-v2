const event = require('../events')
const debug = require('../debug')
const Player = require('../../entities/Player')
const Authentication = require('./Authentication')

module.exports = class Connection {
    socket
    account
    player
    token
    server
    loggedIn = false

    constructor(server, socket) {
        this.server = server
        this.socket = socket
    }

    authenticate(auth) {
        this.socket = auth.socket
        this.account = auth.account
        this.token = auth.account.token
        this.loggedIn = true
    }

    listenEvents() {
        console.log('dinliyorum')
    }

    doIKnowYou() {
        let socket = this.socket
        socket.on(event.on.Login, (credentials) => {
            debug.success('login credentials arrived', 'client-' + socket.id)
            let auth = new Authentication(credentials, socket);
            auth.auth().then((response) => {
                if (typeof response.account.token != "undefined") {

                    socket.emit(event.emit.LoginToken, {token: response.account.token})
                    this.authenticate(response)
                    let player = new Player(response.account)
                    this.player = player.getPlayer()
                    this.server.handshake(this)
                    this.listenEvents()
                } else {
                    socket.emit(event.emit.WrongCredentials)
                }
            }).catch((reason) => {
                socket.emit(event.emit.NoSuchUser)
            })
        });
    }


}
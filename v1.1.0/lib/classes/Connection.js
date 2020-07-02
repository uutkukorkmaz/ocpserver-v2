const event = require('../events')
const debug = require('../debug')
const database = require('./Database')

module.exports = class Connection {
    socket
    account
    token
    server
    loggedIn = false

    constructor(server,socket) {
        this.server = server
        this.socket = socket
    }

    authenticate(auth) {
        this.socket = auth.socket
        this.account = auth.account
        this.token = auth.account.token
        this.loggedIn = true
    }

    static doIKnowYou() {
        let socket = this.socket
        if (!this.loggedIn) {
            socket.on(event.on.Login, (credentials) => {
                debug.success('login credentials arrived', 'client-' + socket.id)
                let auth = new Authentication(credentials, socket);
                let a = auth.auth().then(async (response) => {
                    if (typeof response.account.token != "undefined") {
                        socket.emit(event.emit.LoginToken, {token: response.account.token})
                        const db = database()
                        try {
                            let player = await db.query("SELECT * FROM players WHERE account=?", [response.account.id])
                            player = player[0]
                            socket.emit(event.emit.LoginPlayer, player)
                            connection.authenticate(auth)
                        } catch (err) {
                            debug.error(err)
                        } finally {
                            db.close()
                        }


                    } else {
                        socket.emit(event.emit.WrongCredentials)
                    }
                }).catch((reason) => {
                    socket.emit(event.emit.NoSuchUser)
                })
            })
        }else{
            socket.on(event.on.LoggedIn,(token)=>{
              debug.log("sen burdaydın abi");
            })
        }
    }
}
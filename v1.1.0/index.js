const config = require('./lib/config')
const SocketIO = require('socket.io')
const chalk = require('chalk')
const debug = require('./lib/debug')
const database = require('./lib/classes/Database')
const Server = require('./lib/classes/Server')
const Connection = require('./lib/classes/Connection')
const event = require('./lib/events')
const Authentication = require('./lib/classes/Authentication')

debug.processing('attempting to start server', "application")
let io = new SocketIO(config.port, config.serverOptions)
let server = new Server()
debug.success('server started on port ' + chalk.bold(config.port))

io.on(event.on.Connect, (socket) => {
    socket.emit(event.emit.Register, {id: socket.id})
    debug.log("connection detected. waiting for the account credentials from socket " + socket.id)


    socket.on(event.on.Login, (credentials) => {
        debug.success('login credentials arrived', 'client-' + socket.id)
        let auth = new Authentication(credentials, socket);
        let a = auth.auth().then(async (response) => {
            if (typeof response.account.token != "undefined") {
                socket.emit(event.emit.LoginToken,{token:response.account.token})
                const db = database()
                try {
                    let player = await db.query("SELECT * FROM players WHERE account=?", [response.account.id])
                    player = player[0]
                    socket.emit(event.emit.LoginPlayer,player)
                    let b = new Connection(response, server)
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
    /*socket.on('positionUpdate', (data) => {

        console.log(socket.id)
    })*/
    socket.on(event.on.Disconnect, () => {
        debug.log("connection has been lost with " + socket.id)
    })
})
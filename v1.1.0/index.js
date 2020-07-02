const config = require('./lib/config')
const SocketIO = require('socket.io')
const chalk = require('chalk')
const debug = require('./lib/debug')
const Server = require('./lib/classes/Server')
const Connection = require('./lib/classes/Connection')
const Authentication = require('./lib/classes/Authentication')

debug.processing('attempting to start server', "application")
let io = new SocketIO(config.port, config.serverOptions)
let server = new Server()
debug.success('server started on port ' + chalk.bold(config.port))

io.on('connection', (socket) => {
    socket.emit('register', {id: socket.id})
    debug.log("connection detected. waiting for the account credentials from socket " + socket.id)



    socket.on('login', (credentials) => {
        debug.success('login credentials arrived','client-'+socket.id)
        let auth = new Authentication(credentials, socket);
        debug.log(credentials.toString())
        let a = auth.auth().then((account) => {
            if (typeof account != "undefined") {
                debug.log(account.toString())
                let b = new Connection(account,server)

            } else {
                debug.error("wrong credentials")
            }
        }).catch((reason) => {
            debug.error("authentication credentials is rejected. there is no such a user")
            debug.error(reason.toString())
        } )
    })
    /*socket.on('positionUpdate', (data) => {

        console.log(socket.id)
    })*/
    socket.on('disconnect',()=>{
        debug.log("connection has been lost with " + socket.id)
    })
})
const config = require('./lib/config')
const SocketIO = require('socket.io')
const chalk = require('chalk')
const debug = require('./lib/debug')
const Server = require('./lib/classes/Server')
const Connection = require('./lib/classes/Connection')
const Authentication = require('./lib/classes/Authentication')

debug.processing('attempting to start server', "application")
let io = new SocketIO(config.port, {
    transports: ['websocket'],
    upgrade: false
})
let server = new Server()
debug.success('server started on port ' + chalk.bold(config.port))

io.once('connection', (socket) => {
    socket.emit('register', {id: "TEST"})
    debug.log("connection detected. waiting for the account credentials from socket " + socket.id)

    socket.on('ping',(data) => {
        debug.log('test event has been reached to the server')
        socket.emit('pong',{event:'test'});
    })

    socket.on('login', (credentials) => {
        let auth = new Authentication(credentials, socket);
        let a = auth.auth().then((account) => {
            if (typeof account != "undefined") {
                //debug.log("account token: " + t.account.token)
                let b = new Connection(account,server)

            } else {
                debug.error("wrong credentials")
            }
        })
    })
    /*socket.on('positionUpdate', (data) => {

        console.log(socket.id)
    })*/
    socket.on('disconnect',()=>{
        debug.log("connection has been lost with " + socket.id)
    })
})
const config = require('./lib/config')
const SocketIO = require('socket.io')
const chalk = require('chalk')
const debug = require('./lib/debug')
const Server = require('./lib/classes/Server')
const Connection = require('./lib/classes/Connection')
const event = require('./lib/events')


debug.processing('attempting to start server', "application")
let io = new SocketIO(config.port/*, config.serverOptions*/)
let server = new Server()
debug.success('server started on port ' + chalk.bold(config.port))

io.on(event.on.Connect, (socket) => {
    socket.emit(event.emit.Register, {id: socket.id})
    debug.log("connection detected. waiting for the account credentials from socket " + socket.id)
    let connection = new Connection(server, socket)

    connection.doIKnowYou();



    socket.on(event.on.Disconnect, () => {
        debug.log("connection has been lost with " + socket.id)
    })
})
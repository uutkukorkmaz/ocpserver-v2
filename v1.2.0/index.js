let SocketIO = require('socket.io')
let Server = require('./System/Server')
let Client = require('./System/Client')
let config = require('./Helpers/config')
let debug = require('./Helpers/debug')
let event = require('./Helpers/events')


let server = new Server();
let io = new SocketIO(config.port,config.serverOptions);
debug.success("server started")

io.on(event.on.Connect,socket => {
    let client = server.onConnected(socket)
    socket.emit(event.emit.Register,{id:client.id})
    client.listenEvents()
})



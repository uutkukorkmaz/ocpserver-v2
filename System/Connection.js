module.exports = class Connection {
    socket;
    player;
    server;
    room;


    constructor() {

    }

    createEvents() {
        let connection = this;
        let socket = connection.socket;
        let server = connection.server;
        let player = connection.player;

        //socket.emit('spawn',player);
        socket.broadcast.emit('spawn', player);
        console.log(Object.keys(server.players).length+" players connected");
        console.log(server.players);
        for(let PlayerID in this.players){
            if(PlayerID != player.id) {
                socket.emit('spawn', server.players[PlayerID]);
                console.log(PlayerID+' spawned on '+player.id);
            }else{
                console.log(PlayerID + "="+player.id);
            }
        }

        socket.on('updatePosition',(e) => {
            player.position.x = e.vector.x;
            player.position.y = e.vector.y;
            player.position.z = e.vector.z;
            socket.broadcast.emit('updatePosition',e);
        });

        socket.on('disconnect', () => {
           server.onDisconnected(connection);
        });
    }
}
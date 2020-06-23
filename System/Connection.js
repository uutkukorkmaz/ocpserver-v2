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


        this.Spawn();

        socket.on('updatePosition',(e) => {
           this.updatePosition(e);
        });
        socket.on('disconnect', () => {
           server.onDisconnected(connection);
        });
    }

    Spawn(){
        let connection = this;
        let socket = connection.socket;
        let server = connection.server;
        let player = connection.player;

        socket.broadcast.emit('spawn', player);
        for(let PlayerID in server.players){
            if(PlayerID != player.id && server.players[PlayerID].room == player.room) {
                socket.emit('spawn', server.players[PlayerID]);
            }

        }
    }

    updatePosition(data){
        let connection = this;
        let socket = connection.socket;
        let player = connection.player;

        player.position.x = data.vector.x;
        player.position.y = data.vector.y;
        player.position.z = data.vector.z;
        socket.broadcast.emit('updatePosition',data);
    }

}
let debug = require('../Helpers/debug')
let event = require('../Helpers/events')
let database = require('./QuickDatabase')
let server = require('./Server')
let Maps = require('./Entities/Maps')
let Player = require('./Entities/Player')
let hash = require('./Hash')
let idg = require('./IDG')
module.exports = class Client {
    id = "CL-" + idg.generate()
    socket;
    server;
    account;
    player;

    constructor() {

    }

    listenEvents() {
        let socket = this.socket
        let server = this.server
        debug.log('connected waiting for login credentials', this.id)
        socket.on(event.on.Login, credentials => {
            debug.log('login event', this.id)
            this.loginEvent(credentials).then(r => {
            });
        });

        socket.on(event.on.Ready, () => {
            debug.log("I'm ready", this.id)
            this.spawnEvent()
        })

        socket.on(event.on.positionUpdate, data => {
            this.player.position = data.vector;
            this.server.connections[this.id].player = this.player;
            socket.broadcast.emit(event.emit.positionUpdate, this.preparePlayerData(this.player))
        })

        socket.on(event.on.Disconnect, () => {
            if (this.account !== undefined) {
                server.accountLeft(this.account.token)
            }
            if (server.connections.indexOf(this.id) > -1) {
                delete server.connections[this.id]
            }
            debug.log('player disconnected & logged out ', this.id)
        });


    }

    spawnEvent() {
        let socket = this.socket
        let server = this.server
        debug.log('Spawning on "' + this.player.map + '"',this.id)
        socket.broadcast.emit(event.emit.Spawn, this.preparePlayerData(this.player))
        debug.log("tell everyone to in my map, i'm spawned", this.id);
        for (let ObjectID in server.connections) {
            let currentPlayer = server.connections[ObjectID].player
            if (ObjectID !== this.id && this.player.mapObject.sceneName === currentPlayer.mapObject.sceneName) {
                debug.log(currentPlayer.account.username + " spawned", this.id)
                socket.emit(event.emit.Spawn, this.preparePlayerData(currentPlayer))

            }
        }
    }


    async loginEvent(credentials) {
        let db = database()
        let socket = this.socket
        let accountSql = "SELECT * FROM accounts WHERE username=?"
        let playerSql = "SELECT * FROM players WHERE account=?"
        let response = {}
        try {

            response = {status: 0, msg: "Giriş işlemi yapılıyor..."}
            debug.log(response.msg, this.id)
            socket.emit(event.emit.LoginProcess, response)

            await new Promise(sleep => setTimeout(sleep, 1000));
            let result = await db.query(accountSql, [credentials.username])
            if (result[0] !== undefined) {
                result = result[0]
                if (!this.server.checkAccount(result.token)) {
                    if (hash.verify(result.password, credentials.password)) {
                        let getPlayer = await db.query(playerSql, [result.id])
                        // TODO: improve this part to being able to serve multiple player for each account
                        this.account = result
                        this.server.accountLoggedIn(this.account)
                        this.definePlayerObject(getPlayer[0])
                        response = {status: 1, msg: "Hesap doğrulandı, sunucuya bağlanıyor."}
                        debug.log(response.msg, this.id)
                        socket.emit(event.emit.LoginProcess, response)
                        socket.emit(event.emit.LoginToken, {token: result.token})
                        socket.emit(event.emit.LoginPlayer, this.player)


                    } else {
                        response = {status: -1, msg: "Şifrenizi yanlış girdiniz."}
                        debug.log(response.msg, this.id)
                        socket.emit(event.emit.LoginProcess, response)
                    }
                } else {
                    response = {status: -1, msg: "Hesap zaten bağlı."}
                    debug.log(response.msg, 'Client-' + this.id)
                    socket.emit(event.emit.LoginProcess, response)
                }
            } else {
                response = {status: -1, msg: "Kullanıcı bulunamadı."}
                debug.log(response.msg, 'Client-' + this.id)
                socket.emit(event.emit.LoginProcess,)
            }

        } catch (e) {
            debug.error(e)

        } finally {
            db.close()
        }
    }

    definePlayerObject(object) {
        this.player.id = object.id
        this.player.name = object.name
        this.player.account = this.account
        this.player.hp = object.hp
        this.player.maxHP = object.maxHP
        this.player.mp = object.mp
        this.player.maxMP = object.maxMP
        this.player.exp = object.exp
        this.player.level = object.level
        this.player.gold = object.gold
        this.player.changeMap(this.server.maps[object.map], this.server)
        this.player.position = {
            x: object.posX,
            y: object.posY,
            z: object.posZ,
        }
    }

    preparePlayerData(player) {
        return {
            id: player.objectID.toString(),
            position: player.position
        }
    }
}

let debug = require('../Helpers/debug')
let event = require('../Helpers/events')
let database = require('./QuickDatabase')
let server = require('./Server')
let Maps = require('./Entities/Maps')
let hash = require('./Hash')
let idg = require('./IDG')
module.exports = class Client {
    id = idg.generate()
    socket;
    server;
    account;
    player;

    constructor() {

    }

    listenEvents() {
        let socket = this.socket
        let server = this.server;
        debug.log('player connected waiting for login credentials ')
        socket.on(event.on.Login, credentials => {
            debug.log('login event');
            this.loginEvent(credentials).then(r => {});
        });

        socket.on(event.on.Disconnect, () => {
            server.accountLeft(this.account.token)
            delete server.connections[this.id]
            debug.log('player disconnected & logged out')
        });


    }

    async loginEvent(credentials) {
        let db = database()
        let socket = this.socket
        let accountSql = "SELECT * FROM accounts WHERE username=?"
        let playerSql = "SELECT * FROM players WHERE account=?"
        let response = {}
        try {

            response = {status: 0, msg: "Giriş işlemi yapılıyor..."}
            debug.log(response.msg)
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
                        this.server.accountLoggedIn(this.account.token)
                        this.definePlayerObject(getPlayer[0])
                        response = {status: 1, msg: "Hesap doğrulandı, sunucuya bağlanıyor."}
                        debug.log(response.msg)
                        socket.emit(event.emit.LoginProcess, response)
                        socket.emit(event.emit.LoginToken, {token: result.token})
                        socket.emit(event.emit.LoginPlayer, this.player)
                    } else {
                        response = {status: -1, msg: "Şifrenizi yanlış girdiniz."}
                        debug.log(response.msg)
                        socket.emit(event.emit.LoginProcess, response)
                    }
                } else {
                    response = {status: -1, reason: "Hesap zaten bağlı."}
                    debug.log(response.msg)
                    socket.emit(event.emit.LoginProcess, response)
                }
            } else {
                response = {status: -1, reason: "Kullanıcı bulunamadı."}
                debug.log(response.msg)
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
}

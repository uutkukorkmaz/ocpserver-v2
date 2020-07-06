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

        socket.on(event.on.Login, credentials => {
            this.loginEvent(credentials).then(r => {
            })
        });


    }

    async loginEvent(credentials) {
        let db = database()
        let socket = this.socket
        let accountSql = "SELECT * FROM accounts WHERE username=?"
        let playerSql = "SELECT * FROM players WHERE account=?"

        try {
            socket.emit(event.emit.LoginProcess, {status: 0, msg: "Giriş işlemi yapılıyor..."})
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
                        socket.emit(event.emit.LoginProcess, {status: 1, msg: "Hesap doğrulandı, sunucuya bağlanıyor."})
                        socket.emit(event.emit.LoginToken, {token: result.token})
                        socket.emit(event.emit.LoginPlayer, this.player)
                    } else {
                        socket.emit(event.emit.LoginProcess, {status: -1, msg: "Şifrenizi yanlış girdiniz."})
                    }
                } else {
                    socket.emit(event.emit.LoginProcess, {status: -1, reason: "Hesap zaten bağlı."})
                }
            } else {
                socket.emit(event.emit.LoginProcess, {status: -1, reason: "Kullanıcı bulunamadı."})
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

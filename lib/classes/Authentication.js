const database = require('./Database')
const debug = require('../debug')
module.exports = class Authentication {
    credentials
    socket
    response = {
        account: null,
        socket: null
    }

    constructor(credentials, socket) {
        this.credentials = credentials
        this.socket = socket
        //this.server = server

    }

    async auth() {
        let credentials = this.credentials
        const db = database()
        try {
            let user = await db.query("SELECT * FROM accounts WHERE username=? AND password=PASSWORD(?)", [credentials.username, credentials.password])
            user = user[0]
            this.response.account = user
            this.response.socket = this.socket

        } catch (err) {
            debug.error(err)
        } finally {
            db.close()
        }

        return this.response

    }


}
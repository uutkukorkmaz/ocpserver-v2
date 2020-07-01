module.exports = class Connection {
    socket
    account
    token
    server
    constructor(authentication,server) {
        this.socket = authentication.socket
        this.account = authentication.account
        this.token = authentication.account.token
        this.server = server
        console.log(this)
    }
}
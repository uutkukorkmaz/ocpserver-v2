module.exports = class Authorization{
    constructor(connection) {
        this.connection = connection;
    }

    setUsername(userName){
        this.username = userName
        return this
    }

    setPassword(password){
        this.password = password
        return this
    }

    authorize(){
        let server = this.connection.server;
    }

}
module.exports = {
    on: {
        Connect: "connection",
        Disconnect: "disconnect",
        Login: "login",
    },
    emit: {
        Register: "register",
        NoSuchUser: "noSuchUser",
        WrongCredentials: "wrongCredentials",
        LoginToken: "loginToken",
        LoginPlayer: "loginPlayer"
    }
}
module.exports = {
    on: {
        Connect: "connection",
        Disconnect: "disconnect",
        Login: "login",
        Ready: "ready",
        positionUpdate: "positionUpdate",
    },
    emit: {
        Register: "register",
        LoginProcess: "loginProcess",
        LoginToken: "loginToken",
        LoginPlayer: "loginPlayer",
        Spawn: "spawn",
        positionUpdate: "positionUpdate",
    }
}
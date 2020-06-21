exports.Config = {

    ServerName: 'OCP Server',
    ServerVersion: 'dev-1.0.013',
    Port: process.env.PORT || 52300,

    db: {
      host: "localhost",
      user: "root",
      password: "",
      name: "ocp"
    },

    ColorBlack: "\x1b[30m",
    ColorRed: "\x1b[31m",
    ColorGreen: "\x1b[32m",
    ColorYellow: "\x1b[33m",
    ColorBlue: "\x1b[34m",
    ColorMagenta: "\x1b[35m",
    ColorCyan: "\x1b[36m",
    ColorWhite: "\x1b[37m",

    UniqueIdLength: 6,

}
exports.events = [
    {eventName: "connection",function:"on  "},
    {eventName: "register",function:"emit"},
    {eventName: "spawn",function:"emit",type:"broadcast"},
    {eventName: "spawn",function:"emit"},
    {eventName: "positionUpdate",function:"on  "},
    {eventName: "positionUpdate",function:"emit"},
    {eventName: "playerLeft",function:"emit",type:"broadcast"},
    {eventName: "disconnect",function:"on  "},
]
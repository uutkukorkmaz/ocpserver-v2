exports.Config = {

    ServerName: 'OCP Server',
    ServerVersion: 'dev-1.0.014',
    Port: process.env.PORT || 52300,

    db: {
      host: "localhost",
      user: "root",
      password: "",
      name: "ocp"
    },

    UniqueIdLength: 12,

}
exports.events = [
    {eventName: "connection",function:"on  "},
    {eventName: "register",function:"emit"},
    {eventName: "spawn",function:"emit",type:"broadcast"},
    {eventName: "spawn",function:"emit"},
    {eventName: "positionUpdate",function:"on  "},
    {eventName: "positionUpdate",function:"emit",type:"broadcast"},
    {eventName: "playerLeft",function:"emit",type:"broadcast"},
    {eventName: "disconnect",function:"on  "},
]
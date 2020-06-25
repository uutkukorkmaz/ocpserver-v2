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
    {eventName: "needLogIn",function:"emit"},
    {eventName: "login",function:"on  "},
    {eventName: "spawn",function:"emit",type:"broadcast | neededEvent: login"},
    {eventName: "spawn",function:"emit",type:"neededEvent: login"},
    {eventName: "positionUpdate",function:"on  ",type:"neededEvent: login"},
    {eventName: "positionUpdate",function:"emit",type:"broadcast | neededEvent: login"},
    {eventName: "playerLeft",function:"emit",type:"broadcast"},
    {eventName: "disconnect",function:"on  "},
]
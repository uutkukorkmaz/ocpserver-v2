let Cfg = require('./Config');

module.exports = class Msg {
    constructor(msg, serverStatus = "success") {
        if (serverStatus == "success")
            console.log(Cfg.Config.ColorGreen + '[' + Cfg.Config.ServerName + ']: ' + Cfg.Config.ColorWhite + msg);
        else if (serverStatus == "processing")
            console.log(Cfg.Config.ColorYellow + '[' + Cfg.Config.ServerName + ']: ' + Cfg.Config.ColorWhite + msg)
        else if (serverStatus == "info")
            console.log(Cfg.Config.ColorBlue + '[' + Cfg.Config.ServerName + ']: ' + Cfg.Config.ColorWhite + msg)
        else
            console.log(Cfg.Config.ColorRed + '[' + Cfg.Config.ServerName + ']: ' + Cfg.Config.ColorWhite + msg)
    }
}
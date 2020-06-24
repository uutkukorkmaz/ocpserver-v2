const chalk = require('chalk');
let Cfg = require('./Config');

module.exports = class Msg {
    constructor(msg, status = "success", fromServer = true, where = null) {
        let s = {
            "success": chalk.bold.green,
            "processing": chalk.bold.yellow,
            "info": chalk.bold.cyan,
            "error": chalk.bold.magenta
        }
        let from = fromServer ? Cfg.Config.ServerName : where;
        let print = `[${s[status](from)}]: ${chalk.white(msg)}`;
        console.log(print);
    }

}
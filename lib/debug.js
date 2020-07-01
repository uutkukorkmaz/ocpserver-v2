const chalk = require('chalk')
const config = require('./config')
module.exports = class Debug {

    static log(msg, from = null, ch = null) {

        from = from == null ? "server" : from
        ch = ch == null ? chalk.bold.white : ch
        let print = `${ch('[' + from + ']')}: ${chalk.white(msg)}`
        if (config.debug) {
            console.log(print)
        } else {
            if (ch !== chalk.bold.white) {
                console.log(print)
            }
        }

    }

    static processing(msg, from = null) {
        this.log(msg, from, chalk.bold.yellow)
    }

    static success(msg, from = null) {
        this.log(msg, from, chalk.bold.green)
    }

    static error(msg, from = null) {
        this.log(msg, from, chalk.bold.red)
    }

    static info(msg, from = null) {
        this.log(msg, from, chalk.bold.cyan)
    }
}
const MySql = require('mysql');
const Cfg = require('./Config');
const chalk = require('chalk');
const Msg = require('./Msg');

module.exports = class Database {
    con;

   constructor() {
       new Msg('Trying to connect the database on port '+chalk.inverse(' 3306 '));
       try {
           this.con = MySql.createConnection({
               host: Cfg.Config.db.host,
               user: Cfg.Config.db.user,
               password: Cfg.Config.db.password,
               database: Cfg.Config.db.name
           });


           this.con.connect((err) => {
               if (err) {new Msg(err,"error",false,"MYSQL") }else {
                   new Msg('Connected the MySQL database: ' + chalk.bold(Cfg.Config.db.name));
                   new Msg("Server is ready to connect");
               }
           });
       }catch (e) {
           new Msg(e,"error",false,"MYSQL");
       }
   }



}
const MySql = require('mysql');
const Cfg = require('./Config');
const Msg = require('./Msg');

module.exports = class Database {
    con;

   constructor() {
       this.con = MySql.createConnection({
           host: Cfg.Config.db.host,
           user: Cfg.Config.db.user,
           password: Cfg.Config.db.password,
           database: Cfg.Config.db.name
       });

       this.con.connect((err) => {
          if(err) throw err;
          new Msg('Connected the MySQL database: '+ Cfg.Config.db.name);
           new Msg("Server is ready to connect");
       });
   }

   //Perform()


}
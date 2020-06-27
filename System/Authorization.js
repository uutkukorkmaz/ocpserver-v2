let ip = require('ip')
module.exports = class Authorization {
    constructor(connection, server) {
        this.server = server;
        this.connection = connection;
        this.username = null;
        this.password = null;
    }

    setUsername(userName) {
        this.username = userName
        return this
    }

    setPassword(password) {
        this.password = password
        return this
    }

    authorize() {
        let server = this.server;
        let connection = this.connection;
        let player = this.connection.player;
        let db = server.database.con;

        db.query("SELECT * FROM accounts WHERE login=? AND password=PASSWORD(?)", [this.username, this.password], (err, res) => {
            if (err) throw err;
            let account = res[0];
            let now = new Date();
            if (typeof account == 'undefined') {
                connection.socket.emit('wrongCredentials')
            } else {
                // banlı mı değil mi kontrol
                db.query("SELECT * FROM ipban WHERE ip=?", [ip.address()], (err, res) => {
                    if (res.length > 0) {
                        this.connection.socket.emit('ipBanned');
                        // IP Banlı
                    } else {
                        db.query("SELECT * FROM blocklist WHERE account=? ORDER BY id DESC", [account.id], (err, res) => {
                            if (res.length > 0) {
                                if (now.getTime() < new Date(res[0].banEnds).getTime()) {
                                    console.log(res[0]);
                                    this.connection.socket.emit('accountBanned', res[0]);
                                } else {
                                    //sunucuda giriş yapmış mı kontrol edip player'ı çek
                                    console.log("giriş başarılı");
                                }
                            } else {
                                //sunucuda giriş yapmış mı kontrol edip player'ı çek
                                console.log("giriş başarılı");
                            }
                        });
                    }
                });

            }
        });

    }


}
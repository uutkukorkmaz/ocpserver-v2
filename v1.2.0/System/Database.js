let mysql = require('mysql')
let hash = require('./Hash')
/**
 * Helpers
 * */
let debug = require('../Helpers/debug')
let config = require('../Helpers/config')


module.exports = class Database {
    /**
     * Creates connection pool
     * */
    constructor() {
        this.pool = mysql.createPool(config.database[config.environment])
        debug.success("connection pool has been created for database")
    }

    /**
     * Creates connection
     * */
    Connect(callback) {
        let pool = this.pool
        pool.getConnection((err, conn) => {
            if (err) {
                debug.error(err, "mysql")
            }
            callback(conn)
            return conn
        });

    }

    /**
     * Handles login stuff
     * */
    SignIn(credentials, callback = function(a){}) {
        this.Connect(async (connection) => {
            let sql = "SELECT * FROM accounts WHERE username=?"
            return await connection.query(sql, [credentials.username], async (err, result) => {
                connection.release()
                if (err) debug.error(err)
                let response = {}
                if (result[0] !== undefined) {
                    // user exists, check for password
                    if (hash.verify(result[0].password, credentials.password)) {
                        // password is correct, do the handshake
                        response = {
                            status: true,
                            msg: "success",
                            data: result[0]
                        }
                        callback(response)
                        return response
                    } else {
                        // password is incorrect, try again
                        response ={
                            status: false,
                            msg: "wrongPassword",
                            data: null
                        }
                        callback(response)
                        return response
                    }
                } else {
                    //user does not exists
                    response = {
                        status: false,
                        msg: "userNotFound",
                        data: null
                    }
                    callback(response)
                    return response
                }

            });
        })
    }

    GetPlayer(accountID, callback) {
        this.Connect(connection => {
            let sql = "SELECT id,name,hp,maxHP,mp,maxMP,exp,level,gold,posX,posY,posZ FROM players WHERE account=?"
            let response = connection.query(sql, [accountID], (err, result) => {
                connection.release()
                if (err) debug.error(err)
                callback(result[0])
            })

        })
    }

}
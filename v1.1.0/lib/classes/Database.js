const config = require('../config')
const mysql = require('mysql')
const util = require('util')
module.exports = () => {
    let conn = mysql.createConnection(config.database[config.environment])
    return {
        query(sql, args) {
            return util.promisify(conn.query)
                .call(conn, sql, args);
        },
        close() {
            return util.promisify(conn.end).call(conn);
        }, beginTransaction() {
            return util.promisify(conn.beginTransaction)
                .call(conn);
        },
        commit() {
            return util.promisify(conn.commit)
                .call(conn);
        },
        rollback() {
            return util.promisify(conn.rollback)
                .call(conn);
        }
    };
}
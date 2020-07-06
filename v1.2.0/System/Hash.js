let md5 = require('md5')

/**
 * Helpers
 * */
let config = require('../Helpers/config')

module.exports = class Hash {

    static generate(data){
        return config.hashPrefix + md5(data) + config.hashEndfix
    }

    static verify(hash,data){
        return this.generate(data) === hash
    }

}
let ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_';
let ID_LENGTH = 8;
let UNIQUE_RETRIES = 9999;

module.exports = class IdGenerator {
    constructor() {

    }
    static prepare() {
        var rtn = '';
        for (var i = 0; i < ID_LENGTH; i++) {
            rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
        }
        return rtn;
    }

    static generate(previous) {
        previous = previous || [];
        var retries = 0;
        var id;

        // Try to generate a unique ID,
        // i.e. one that isn't in the previous.
        while(!id && retries < UNIQUE_RETRIES) {
            id = this.prepare();
            if(previous.indexOf(id) !== -1) {
                id = null;
                retries++;
            }

        }

        return id;
    };
}
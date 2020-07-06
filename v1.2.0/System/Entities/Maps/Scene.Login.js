let MapBase = require('./MapBase')
let Client = require('../../Client')
module.exports = class LoginScene extends MapBase {

    constructor(sceneName,
                spawnable = false,
                gameMode = 'login',
                allowPvp = false,
    ) {
        super(sceneName, spawnable, gameMode, allowPvp);
    }

    onUpdate() {
        super.onUpdate();
    }

    canJoin() {
        return true;
    }

    onJoin(client = Client) {
        super.onJoin(client);
    }

    onLeave(client = Client) {
        super.onLeave(client);
    }
}
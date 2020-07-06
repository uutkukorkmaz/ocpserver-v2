let MapBase = require('./MapBase')
let Client = require('../../Client')
module.exports = class Hub extends MapBase {

    constructor(sceneName,
                spawnable = true,
                gameMode = 'default',
                allowPvp = false,
    ) {
        super(sceneName, spawnable, gameMode, allowPvp);
    }

    onUpdate() {
        super.onUpdate();
    }

    canJoin() {
        return super.canJoin();
    }

    onJoin(client = Client) {
        super.onJoin(client);
    }

    onLeave(client = Client) {
        super.onLeave(client);
    }
}
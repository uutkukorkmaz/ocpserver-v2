const IdGen = require('../IDGenerator');


module.exports = class Player {

    constructor() {

        this.id = "Player_"+IdGen.generate();
        this.position = {
            x: 0,
            y: 0,
            z: 0
        };
        this.room = "hub";


    }


}
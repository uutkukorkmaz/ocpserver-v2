const IdGen = require('../IDGenerator');


module.exports = class Player {

    constructor() {

        this.id = "Player_"+IdGen.generate();
        this.position = {
            x: Math.floor(Math.random() * 10),
            y: 0,
            z: Math.floor(Math.random() * 10)
        };
        this.room = "hub";


    }


}
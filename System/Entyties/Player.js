const IdGen = require('../IDGenerator');


module.exports=class Player {
    constructor() {
        this.data = {
            id: IdGen.generate(),
            map: "default",
            position: {
                x:0,
                y:0,
                z:0
            }
        };

    }


}
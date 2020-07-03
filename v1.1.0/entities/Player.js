const database = require('../lib/classes/Database')
const IDG = require('../lib/classes/IDG')
module.exports = class Player{
    id
    objectID
    name
    account
    hp
    maxHP
    mp
    maxMP
    exp
    level
    gold
    room
    position

    constructor(account) {
        this.account = account
        this.objectID = IDG.generate().toString()
    }

    async getPlayer(){
        const db = database()

        try{
            let player = await db.query("SELECT * FROM players WHERE account=?",[this.account.id])
            player = player[0]
            this.id = player.id
            this.name = player.name
            this.hp = player.hp
            this.mp = player.mp
            this.maxHP = player.maxHP
            this.maxMP = player.maxMP
            this.exp = player.exp
            this.level = player.level
            this.gold = player.gold
            this.room = player.room
            this.position = {
                x: player.posX,
                y: player.posY,
                z: player.posZ,
            }
            return this
        }catch (e) {
            return null
        }finally{

        }
    }

}
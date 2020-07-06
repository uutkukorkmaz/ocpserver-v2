let hub = require('./Maps/Map.Hub')
let loginScene = require('./Maps/Scene.Login')
module.exports = {
    login: new loginScene('loginScene'),
    hub: new hub('hub')
}
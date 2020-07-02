module.exports = {
    serverName:"Untitled Game Server",
    version: "1.0.0",
    environment: "development",
    port: process.env.PORT || 52300,
    database: {
        development: {
            host: "94.73.151.44",
            user: "u9306996_615631",
            password: "Tab8CxT5BUZgMwb",
            database: "u9306996_api"
        },
        production: {
            host: null,
            user: null,
            password: null,
            database: null
        },
    },
    serverOptions: {
        transports: ['websocket'],
        upgrade: true,
        forceNew: false
    },
    uniqueIdLength: 12,
    debug:true,
}


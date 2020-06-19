# Server Documentation [dev-1.0.011]
This documentation tries to explain that how the hell is [gamename]'s server-side works and helps that how to develop it.
## Contents

1. index.js
2. System/
2.1. Config
2.2. Server
2.3. Connection
2.4. Msg
2.5. IDGenerator
2.6. Player



## index.js
Initiates the server.

REQUIRES:

 - `socket.io` as `const SocketIO`
 - `System/Server`
 - `System/Config` as `const ServerConfig`
 - `System/Msg` as `const ConsoleMsg`

## System
### Config.js
Basically a node export JSON file that holds the server's hard configurations like server name, version or ports.

*NO REQUIREMENTS*

### Server.js
Handles the main process and contains **Server** class.

REQUIRES:

- `System/Connection` 
- `System/Msg` 
- `System/Config` as `const Cfg`
- `System/Entities/Player` 

METHODS:

`constructor()`
- Method takes no parameters, just defines and holds server objects.

`onConnected(socket)`
- The `socket` parameter that the method takes is socket object which created after a successful handshake with any client. 
Method starts with creating a `System/Connection` class object into `Server.connection` variable. Then in order to reach socket, player and other stuff that related to them defines that into same object with different keys for example: `Server.connection.socket`
Finally pushes `Server.connection.player` object into `Server.players` object for being able to broadcast to other sockets.

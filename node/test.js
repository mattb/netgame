var sys = require("sys"),
ws = require("./ws");
require("./underscore");

var sockets = [];

var i = 0;

setInterval(function() {
    _.each(sockets, function(websocket) {
        if(websocket.readyState != 'closed') {
            websocket.write("WTF? " + i);
            i++;
        }
    });
},1000);

ws.createServer(function (websocket) {
    websocket.addListener("connect", function (resource) { 
        // emitted after handshake
        sys.debug("connect: " + resource);
        sockets.push(websocket);

        // server closes connection after 10s, will also get "close" event
        setTimeout(websocket.end, 10 * 1000); 
    }).addListener("data", function (data) { 
        // handle incoming data
        sys.debug(data);

        // send data to client
        websocket.write("Thanks!");
    }).addListener("close", function () { 
        // emitted when server or client closes connection
        sys.debug("close");
        sockets = _.without(sockets,websocket);
    });
}).listen(8080);

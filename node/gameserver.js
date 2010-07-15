var sys = require("sys"),
ws = require("./ws");
require("./underscore");
require("./date");

var sockets = [];

var i = 0;

setInterval(function() {
    _.each(sockets, function(websocket) {
        if(websocket.readyState != 'closed') {
            //websocket.write(((i%20) * 50) + ' 500');
            i++;
        }
    });
},2500);

ws.createServer(function (websocket) {
    websocket.addListener("connect", function (resource) { 
        // emitted after handshake
        sys.debug("connect: " + resource);
        sockets.push(websocket);

        // server closes connection after 60s, will also get "close" event
        setTimeout(websocket.end, 60 * 1000); 
    }).addListener("data", function (data) { 
        // handle incoming data
        var parsed = JSON.parse(data);
        sys.debug(new Date().getTime()-Date.parse(parsed.when).getTime());

        // send data to client
        // websocket.write("Thanks!");

        _.each(_.without(sockets,websocket), function(w) {
            if(w.readyState != 'closed') {
                w.write(data);
            }
        });
    }).addListener("close", function () { 
        // emitted when server or client closes connection
        sys.debug("close");
        sockets = _.without(sockets,websocket);
    });
}).listen(9990);

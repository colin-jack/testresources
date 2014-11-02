var freePort = require("freeport");

var getPortToListenOn = function getPortToListenOn(addr) {
    return addr ? arr.port : port;
}

// When we are done with an instance of express we increment the port counter,
// ensuring that even if we don't close the express instance we don't end up
// trying to open another instance listening on the same port
var releasePort = function releasePort() {
    port = getFreePort();
}

var getFreePort = function () {
    freePort(function (er, port) {
        if (er) throw new Error("Failed to find a free port.");

        return port;
    })
}

var portManager = {
    getPortToListenOn: getPortToListenOn,
    releasePort: releasePort
}

portManager.__defineGetter__("port", function() {
    return port;
});

var port = getFreePort();

module.exports = portManager;
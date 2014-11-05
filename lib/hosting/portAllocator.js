var Q = require("q");
var getFreePort = Q.denodeify(require("freeport"));

var port;

var allocatePort = function * () {
    //return freePort()
    //            .then(function (theFreePort) {
    //                debugger;
    //                port = theFreePort;
    //                return port;
    //            })
    //            .done();

    port = yield getFreePort();
    return port;
}

var returnPort = function () {
    debugger;
    return port;
}

// When we are done with an instance of express we increment the port counter,
// ensuring that even if we don't close the express instance we don't end up
// trying to open another instance listening on the same port
var releasePort = function releasePort() {
    return allocatePort();
}

var proto = {
    allocatePort: allocatePort,
    releasePort: releasePort
}

var portProperty = {
    "port": { get: returnPort }
};

var portAllocator = Object.create(proto, portProperty);

module.exports = portAllocator;
var winston = require('winston'),
var portAllocator = require('./portAllocator');

var startServer = function startServer(expressApp, port) {
    var server = http.createServer(expressApp);

    return server.listen(currentPort);
}

module.exports = startServer;
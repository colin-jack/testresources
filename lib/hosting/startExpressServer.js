var http = require('http');
var winston = require('winston');
var portAllocator = require('./portAllocator');

var startServer = function startServer(expressApp, port) {
    var server = http.createServer(expressApp);
    
    winston.info("Starting express listening on port %s.", port);
    
    return server.listen(port);
}

module.exports = startServer;
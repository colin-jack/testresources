var http = require('http');
var winston = require('winston');
var portAllocator = require('./portAllocator');

var startServer = function startServer(app, port) {
	// TODO: Eventually should support https

    if (!app) throw new Error("The server to start must be provided.")
    
    var server = http.createServer(app.callback());
    
    winston.info("Starting express listening on port %s.", port);
    
    return server.listen(port);
}

module.exports = startServer;
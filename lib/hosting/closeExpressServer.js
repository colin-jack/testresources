var winston = require('winston');
var testResources = require('require-namespace').testResources;
var portAllocator = testResources.portAllocator;
var Q = require('q');

var close = function * (serverWrapper) {
    try {
        // TODO: Likely to be because another request in the chain has already closed it.
        if (serverWrapper === undefined) {
            winston.info("serverWrapper was undefined so closing failed.")
            return;
        }
                
        if (serverWrapper.port) {
            var port = serverWrapper.port;
            winston.info("Port '" + port + "' closed.")
        }
        
        serverWrapper.server.close();
        
        serverWrapper.server = undefined;
        
        yield * portAllocator.releasePort();
    }
    catch (e) {
        winston.error("Failed to close express due to : " + e);
        throw e;
    }
};

module.exports = close;

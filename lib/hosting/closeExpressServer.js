var winston = require('winston');
var testResources = require('require-namespace').testResources;
var portAllocator = testResources.portAllocator;

var close = function * (listeningServer) {
    debugger;
    try {
        // TODO: Likely to be because another request in the chain has already closed it.
        if (listeningServer === undefined) {
            winston.info("listeningServer was undefined so closing failed.")
            return;
        }
        
        yield nbind(listeningServer.close, listeningServer);
    
        if (listeningServer.address()) {
            var port = listeningServer.address().port;
            winston.info("Port '" + port + "' closed.")
        }

        yield this.portAllocator.releasePort();
    }
    catch (e) {
        winston.error("Failed to close express due to : " + e);
        throw e;
    }
};

module.exports = close;

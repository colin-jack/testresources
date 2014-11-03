var winston = require('winston');
var testResources = require('require-namespace').testResources;
var portManager = testResources.portManager;

// TODO: Use IoC
var closeExpress = function(expressApp) {
    portManager.releasePort();

    try {
        // TODO: Likely to be because another request in the chain has already closed it.
        if (expressApp === undefined) {
            winston.info("expressApp was undefined")
            return;
        }
        
        if (expressApp.address()) {
            var port = expressApp.address().port;
        }
        
        expressApp.close();
        
        if (port) {
            winston.info("Port '" + port + "' closed.")
        }
    }
    catch (e) {
        winston.error("Failed to close express due to : " + e)
    }
};

module.exports = closeExpress;
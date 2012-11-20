var winston = require('winston'),
    portManager = require('./portManager');

var closeExpress = function(expressApp) {
    portManager.releasePort();

    try {
        // TODO: Likely to be because another request in the chain has already closed it.
        if (expressApp === undefined) {
            winston.info("expressApp was undefined")
            return;
        }

        var port = expressApp.address().port;

        expressApp.close();  
        winston.info("Port '" + port + "' closed.")
        expressApp = undefined;
    }
    catch (e) {
        winston.error("Failed to close express due to : " + e)
        expressApp = undefined;
    }
};

module.exports = closeExpress;
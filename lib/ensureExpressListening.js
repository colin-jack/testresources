var winston = require('winston'),
    portManager = require('./portManager');

var ensureExpressListening = function ensureExpressListening(expressApp) {
    var addr = expressApp.address();
    var currentPort = portManager.getPortForToListenOn(addr);

    if (!addr) {
        winston.info("Port '" + currentPort + "' listening.")
        expressApp.listen(currentPort);
    }    
}

module.exports = ensureExpressListening;
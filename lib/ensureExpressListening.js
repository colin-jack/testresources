var winston = require('winston');

var port = 3550;

var ensureExpressListening = function ensureExpressListening(expressApp) {
    var addr = expressApp.address();
    var currentPort;
    
    if (addr)
    {
        currentPort = addr.port;
    }
    else
    {
        port = port + 1;
        currentPort = port;
    }  

    if (!addr) {
        winston.info("Port '" + currentPort + "' listening.")
        expressApp.listen(currentPort);
    }    
}

module.exports = ensureExpressListening;
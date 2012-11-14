var port = 3599;

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
        debugger;
        winston.info("About to listen on port: " + currentPort);
        expressApp.listen(currentPort);
    }    
}

module.exports = ensureExpressListening;
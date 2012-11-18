var port = 3550;

var getPortForToListenOn = function getPortForToListenOn(addr) {
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

    return currentPort;
}

module.exports = {
    port: port,
    getPortForToListenOn: getPortForToListenOn
}
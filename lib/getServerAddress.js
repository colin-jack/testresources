var http = require('http'),
    https = require('https');

var port = 3569;

// NOTE - Taken from supertest as it does exactly what I need.
var getServerAddress = function getServerAddress(app, path) {
    var addr = app.address();
    var portno;
    
    if (addr)
    {
        portno = addr.port;
    }
    else
    {
        port = port + 1;
        portno = port;
    }  

    if (!addr) {
        app.listen(portno);
    }
    
    var protocol = app instanceof https.Server ? 'https' : 'http';
    return protocol + '://127.0.0.1:' + portno + path;
};

module.exports = getServerAddress;
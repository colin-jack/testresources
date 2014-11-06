var http = require('http'),
    https = require('https');

var getServerAddress = function getServerAddress(listeningServer, path) {
    var port = listeningServer.address().port;
    var protocol = listeningServer instanceof https.Server ? 'https' : 'http';
    return protocol + '://127.0.0.1:' + port + path;
};

module.exports = getServerAddress;
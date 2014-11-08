var http = require('http'),
    https = require('https');

var getServerAddress = function getServerAddress(listeningServer, path) {
    // TODO: Test this
    if (path.indexOf('http') === 0) return path;

    var port = listeningServer.address().port;
    var protocol = listeningServer instanceof https.Server ? 'https' : 'http';
    return protocol + '://127.0.0.1:' + port + path;
};

module.exports = getServerAddress;
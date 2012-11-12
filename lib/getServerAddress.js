var http = require('http'),
    https = require('https');

var getServerAddress = function getServerAddress(app, path) {
    debugger;
    var port = app.address().port;
    var protocol = app instanceof https.Server ? 'https' : 'http';
    return protocol + '://127.0.0.1:' + port + path;
};

module.exports = getServerAddress;
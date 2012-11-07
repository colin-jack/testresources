var RequestWrapper = require('./RequestWrapper'),
    assert = require('chai').assert,
    format = require('util').format,
    http = require('http'),
    createGetChain = require('./fluent/createGetChain'),
    createPutChain = require('./fluent/createPutChain');

var createWrapper = function(expressApp, verb, relativeUrl, port) {
    var wrapper = new RequestWrapper(expressApp, verb, relativeUrl);

    if (port) {
        wrapper.port = port;
    }

    return wrapper;
}

module.exports = function(expressApp, port) {
    expressApp = http.createServer(expressApp);

    return {
        get: function(relativeUrl) {
            var wrapper = createWrapper(expressApp, "get", relativeUrl, port);
            return createGetChain(wrapper);
        },
        put: function(relativeUrl, body) {
            var wrapper = createWrapper(expressApp, "put", relativeUrl, port);
            wrapper.send(body);
            return createPutChain(wrapper);
        }
    };
};

var RequestWrapper = require('./RequestWrapper'),
    assert = require('chai').assert,
    format = require('util').format,
    http = require('http'),
    createGetChain = require('./fluent/createGetChain'),
    createPutChain = require('./fluent/createPutChain');

var createWrapperFactory = function createWrapperFactory(expressApp, port) {
    return function(verb, relativeUrl) {
        if (!relativeUrl) {
            throw new Error("The relative URL value was not valid: " + relativeUrl);
        }

        var wrapper = new RequestWrapper(expressApp, verb, relativeUrl);

        if (port) {
            wrapper.port = port;
        }

        return wrapper;
    }
}

module.exports = function(expressApp, port) {
    expressApp = (typeof expressApp === 'function') ? http.createServer(expressApp) : expressApp;

    return {
        get: function(relativeUrl) {
            var wrapperFactory = createWrapperFactory(expressApp, port);
            var wrapper = wrapperFactory("get", relativeUrl);

            return createGetChain(wrapper, wrapperFactory);
        },
        put: function(relativeUrl, body) {
            var wrapperFactory = createWrapperFactory(expressApp, port);
            var wrapper = wrapperFactory("put", relativeUrl);
            
            wrapper.send(body);

            return createPutChain(wrapper);
        }
    };
};

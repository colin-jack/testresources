var RequestWrapper = require('./RequestWrapper'),
    assert = require('chai').assert,
    format = require('util').format,
    http = require('http'),
    createGetChain = require('./fluent/createGetChain'),
    createPutChain = require('./fluent/createPutChain'),
    ensureExpressListening = require('./ensureExpressListening'),
    winston = require('winston'),
    portManager = require('./portManager');

var createWrapperFactory = function createWrapperFactory(expressApp) {
    return function(verb, relativeUrl) {
        if (!relativeUrl) {
            throw new Error("The relative URL value was not valid: " + relativeUrl);
        }

        return new RequestWrapper(expressApp, verb, relativeUrl);
    }
}

var createServer = function(expressApp) {
    return http.createServer(expressApp)
}

var entryPointCreator = function(expressApp) {
    expressApp = (typeof expressApp === 'function') ? createServer(expressApp) : expressApp;

    ensureExpressListening(expressApp);

    return {
        get: function(relativeUrl) {
            var wrapperFactory = createWrapperFactory(expressApp);
            var wrapper = wrapperFactory("get", relativeUrl);

            return createGetChain(wrapper, wrapperFactory);
        },
        put: function(relativeUrl, body) {
            var wrapperFactory = createWrapperFactory(expressApp);
            var wrapper = wrapperFactory("put", relativeUrl);
            
            wrapper.send(body);

            return createPutChain(wrapper);
        }
    };
};

entryPointCreator.__defineGetter__("port", function() { return portManager.port } );

module.exports = entryPointCreator;
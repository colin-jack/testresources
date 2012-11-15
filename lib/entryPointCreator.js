var RequestWrapper = require('./RequestWrapper'),
    assert = require('chai').assert,
    format = require('util').format,
    http = require('http'),
    createGetChain = require('./fluent/createGetChain'),
    createPutChain = require('./fluent/createPutChain'),
    ensureExpressListening = require('./ensureExpressListening'),
    winston = require('winston');

var createWrapperFactory = function createWrapperFactory(expressApp) {
    return function(verb, relativeUrl) {
        if (!relativeUrl) {
            throw new Error("The relative URL value was not valid: " + relativeUrl);
        }


        return new RequestWrapper(expressApp, verb, relativeUrl);
    }
}

var createServer = function(expressApp) {
    winston.info("Creating server.")
    return http.createServer(expressApp)
}

module.exports = function(expressApp) {
    expressApp = (typeof expressApp === 'function') ? createServer(expressApp) : expressApp;

    ensureExpressListening(expressApp);

    if(!expressApp.address()) {
        throw new Error("Failed to connect.")
    }

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

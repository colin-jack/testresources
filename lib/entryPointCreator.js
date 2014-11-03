var assert = require('chai').assert;
var winston = require('winston');
var format = require('util').format;
var testResources = require('require-namespace').testResources;
var http = require('http');
var RequestWrapper = testResources.RequestWrapper;
var createGetChain = testResources.createGetChain;
var createPutChain = testResources.createPutChain;
var ensureExpressListening = testResources.ensureExpressListening;
var portManager = testResources.portManager;
var closeExpress = testResources.closeExpress;

var createWrapperFactory = function createWrapperFactory(expressApp) {
    return function (verb, relativeUrl) {
        try {
            if (!relativeUrl) {
                throw new ResourceAssertionError("The relative URL value was not valid: " + relativeUrl);
            }
            
            return new RequestWrapper(expressApp, verb, relativeUrl);
        } catch (e) {
            closeExpress(expressApp);
            throw e;
        }
    }
}

var createServer = function(expressApp) {
    return http.createServer(expressApp)
}

var entryPointCreator = function (expressApp) {
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
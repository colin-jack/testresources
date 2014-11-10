// TODO: Test this

var _u = require('underscore');

var testResources = module.require('./lib/namespace');
var entryPointCreator = testResources.entryPointCreator;
var startTestServer = testResources.startTestServer;

var entryPoint = function (superAgentRequest) {
    return entryPointCreator.create(superAgentRequest);
}

entryPoint.startServer = startTestServer;

module.exports = entryPoint;
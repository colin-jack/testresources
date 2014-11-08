// TODO: Test this

var _u = require('underscore');

var testResources = module.require('./lib/namespace');
var entryPointCreator = testResources.entryPointCreator;
var startServerFluent = testResources.startServerFluent;

var entryPoint = function (superAgentRequest) {
    return entryPointCreator.create(superAgentRequest);
}

entryPoint.startServer = startServerFluent;

module.exports = entryPoint;
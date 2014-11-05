var _u = require('underscore');
var testResources = module.require('./lib/namespace');

var portAllocator = testResources.portAllocator;
var entryPointCreator = testResources.entryPointCreator;
var expressServerStarter = testResources.expressServerStarter;
var expressServerCloser = testResources.expressServerCloser;

module.exports = entryPointCreator;
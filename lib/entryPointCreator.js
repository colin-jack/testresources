var assert = require('chai').assert;
var winston = require('winston');
var format = require('util').format;
var testResources = require('./namespace.js');
var createGetChain = testResources.createGetChain;
var createPutChain = testResources.createPutChain;
var Q = require('q');


var create = function (superAgentRequest) {
    // TODO: Unit test.
    if (!superAgentRequest || !superAgentRequest.end || typeof superAgentRequest.end !== 'function') {
        throw new Error("The passed in object should be a superagent request, with an end method to trigger the request.");
    }

    var chainToReturn = null;

    switch (superAgentRequest.method.toUpperCase()) {
        case "GET":
            chainToReturn = createGetChain();
            break;
        case "PUT":
            chainToReturn = createPutChain(); 
            break;
        case "POST":
            throw new Error("NYI");
            break;
    }

    chainToReturn.superAgentRequest = superAgentRequest;

    return chainToReturn;
}

module.exports = {
    create: create
}
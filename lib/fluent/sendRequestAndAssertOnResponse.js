var winston = require('winston');
var Q = require('q');

var testResources = require('require-namespace').testResources;
var getServerAddress = testResources.getServerAddress;
var makeRequest = testResources.requestPromise;

var assert = function assert(expectations, request, response) {
    var expectationNames = Object.keys(expectations);

    expectationNames.forEach(function(expectationName) {
        var toRun = expectations[expectationName];

        toRun(response, request);
    })
}

// We have a response but we have child chains to run, e.g. one might send a GET request for
// a link in the parent response before doing some validation on that response.
var runChildChain = function * (parentResponse, requestChain, server) {
    var childChain = requestChain.childChain;
    
    childChain.prepareForVerification(parentResponse);

    yield * sendRequestAndAssertOnResponse(childChain, server)
}

var processResponse = function * (response, requestChain, server) {
    assert(requestChain.expectations, requestChain.request, response)

    if (requestChain.childChain) {
        yield * runChildChain(response, requestChain, server)
    }
}

// Send the request and run any assertions specified, if any fail an exception will be thrown
var sendRequestAndAssertOnResponse = function * (requestChain, server) {
    var request = requestChain.superAgentRequest;
       
    var response = yield makeRequest(server, request);
    
    yield * processResponse(response, requestChain, server) 
}

module.exports = sendRequestAndAssertOnResponse;
var winston = require('winston');
var Q = require('q');
var testResources = require('require-namespace').testResources;
var createRequest = testResources.createRequest;
var getServerAddress = testResources.getServerAddress;

var assert = function assert(expectations, request, response) {
    var expectationNames = Object.keys(expectations);

    expectationNames.forEach(function(expectationName) {
        var toRun = expectations[expectationName];

        toRun(response);
    })
}

// We have a response but we have child chains to run, e.g. one might send a GET request for
// a link in the parent response before doing some validation on that response.
var runChildChain = function * (parentResponse, requestChain) {
    var childChain = requestChain.childChain;
    
    debugger;
    yield * sendRequestAndAssertOnResponse(childChain)
}

var processResponse = function * (response, requestChain) {
    debugger;
    assert(requestChain.expectations, requestChain.request, response)

    if (requestChain.childChain) {
        yield * runChildChain(response, requestChain)
    }
}

// make the request, getting back a promise that is fulfilled when the request completes
var makeRequest = function (superAgentRequest) {
    var promiseReturning = Q.nbind(superAgentRequest.end, superAgentRequest);
    return promiseReturning();
}

// Send the request and run any assertions specified, if any fail an exception will be thrown
var sendRequestAndAssertOnResponse = function * (requestChain, server) {
    var request = requestChain.superAgentRequest;
    
    request.url = getServerAddress(server, request.url);
    
    winston.info("About to make request for %s.", request.url)
    
    debugger;
    var response = yield makeRequest(request);
    
    debugger;
    yield * processResponse(response, requestChain) 
}

module.exports = sendRequestAndAssertOnResponse;
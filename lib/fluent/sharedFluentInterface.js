var testResources = require('./../namespace.js');

var expectCached = testResources.cacheExpectation;
var statusExpectation = testResources.statusExpectation;
var sendRequestAndAssertOnResponse = testResources.sendRequestAndAssertOnResponse;
var bodyExpectation = testResources.bodyExpectation;

var format = require('util').format;

var validateServer = function(server) {
    // TODO - It must have the address method we need.
}

var expectBody = function (expectedBody) {
    this.expectations.body = function (response) {
        bodyExpectation(response, expectedBody);
    }
    
    return this;
}

var sharedFluentInterface = {
    expectStatus: function (expectedStatus) {
        this.expectations.status = function(response) {
            statusExpectation(response, expectedStatus);
        }

        return this;
    },
    
    expectBody: expectBody,

    runAgainst: function * (server) {
        validateServer(server);

        yield * sendRequestAndAssertOnResponse(this, server);
    },
    run: function (serverTestApi, done) {
        return serverTestApi.runTest(this, done)
    }
};

module.exports = sharedFluentInterface;
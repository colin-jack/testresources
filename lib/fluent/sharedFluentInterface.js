var format = require('util').format,
    bodyExpectation = require('./../expectation/bodyExpectation'),
    expectCached = require('./../expectation/cacheExpectation'),
    statusExpectation = require('./../expectation/statusExpectation'),
    sendRequestAndAssertOnResponse = require('./sendRequestAndAssertOnResponse');

var validateServer = function(server) {
    // TODO - It must have the address method we need.
}

var sharedFluentInterface = {
    expectBody: function(expectedBody) {
        this.expectStatus(200);
        
        this.expectations.body = function(response) {
            bodyExpectation(response, expectedBody);
        }

        return this;
    },
    expectStatus: function (expectedStatus) {
        this.expectations.status = function(response) {
            statusExpectation(response, expectedStatus);
        }

        return this;
    },
    runAgainst: function(server) {
        validateServer(server);

        sendRequestAndAssertOnResponse(this, server);
    }
};

module.exports = sharedFluentInterface;
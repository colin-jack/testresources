var format = require('util').format,
    bodyExpectation = require('./../expectation/bodyExpectation'),
    expectCached = require('./../expectation/cacheExpectation'),
    statusExpectation = require('./../expectation/statusExpectation'),
    endAndAssert = require('./endAndAssert');

var sharedFluentInterface = {
    expectBody: function(expectedBody) {
        this.expectations["status"] = function(response) {
            statusExpectation(response, 200);
        }
        
        this.expectations["body"] = function(response) {
            bodyExpectation(response, expectedBody);
        }

        return this;
    },
    expectStatus: function(expectedStatus) {
        this.expectations["status"] = function(response) {
            statusExpectation(response, expectedStatus);
        }

        return this;
    },
    run: function(allDone) {
        endAndAssert(this.expectations, this.wrapper, allDone);
    }
};

module.exports = sharedFluentInterface;
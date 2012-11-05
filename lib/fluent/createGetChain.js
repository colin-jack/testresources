var format = require('util').format,
    endAndAssert = require('./endAndAssert'),
    bodyExpectation = require('./../expectation/bodyExpectation'),
    expectCached = require('./../expectation/cacheExpectation'),
    statusExpectation = require('./../expectation/statusExpectation');

var createGetChain = function createGetChain(wrapper) {
    var expectations = {};

    return {
        expectGot: function(expectedBody) {
            expectations["body"] = function(response) {
                bodyExpectation(response, expectedBody);
            }

            expectations["status"] = function(response) {
                statusExpectation(response, 200);
            }

            return this;
        },
        expectStatus: function(expectedStatus) {
            expectations["status"] = function(response) {
                statusExpectation(response, expectedStatus);
            }

            return this;
        },
        run: function(allDone) {
            endAndAssert(expectations, wrapper, allDone);
        },
        expectCached: function(where, minutes) {
            expectations["caching"] = function(response) {
                expectCached(where, minutes, response);
            }

            return this;
        }
    };
};

module.exports = createGetChain;
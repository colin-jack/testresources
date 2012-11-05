var format = require('util').format,
    endAndAssert = require('./endAndAssert'),
    bodyExpectation = require('./../expectation/bodyExpectation'),
    expectCached = require('./../expectation/cacheExpectation'),
    statusExpectation = require('./../expectation/statusExpectation');

var createGetChain = function createGetChain(wrapper) {
    var expectations = [];

    return {
        expectGot: function(expectedBody) {
            expectations.push(function(response) {
                bodyExpectation(response, expectedBody);

                if (response.status !== 200) {
                    throw new Error("The status should have been 200.");
                }
            });

            return this;
        },
        expectStatus: function(expectedStatus) {
            expectations.push(function(response) {
                statusExpectation(response, expectedStatus);
            });

            return this;
        },
        run: function(allDone) {
            endAndAssert(expectations, wrapper, allDone);
        },
        expectCached: function(where, minutes) {
            expectCached(where, minutes, expectations);
            return this;
        }
    };
};

module.exports = createGetChain;
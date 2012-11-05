var endAndAssert = require('./endAndAssert'),
    expectCached = require('./expectCached'),
    format = require('util').format,
    bodyExpectation = require('./bodyExpectation');

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
                 if (response.status !== expectedStatus) {
                    throw new Error(format("The status should have been %s.", expectedStatus));
                }
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
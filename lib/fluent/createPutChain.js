var expectCached = require('./../expectation/cacheExpectation'),
    bodyExpectation = require('./../expectation/bodyExpectation'),
    endAndAssert = require('./endAndAssert'),
    statusExpectation = require('./../expectation/statusExpectation');

var createPutChain = function(wrapper) {
    var expectations = [];

    return {
        expectBody : function(expectedBody) {
            expectations.push(function(response) {
                bodyExpectation(response, expectedBody);
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
        }
    }
}

module.exports = createPutChain;
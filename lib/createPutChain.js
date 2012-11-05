var endAndAssert = require('./endAndAssert'),
    bodyExpectation = require('./bodyExpectation');

var createPutChain = function(wrapper) {
    var expectations = [];

    return {
        expectBody : function(expectedBody) {
            expectations.push(function(response) {
                bodyExpectation(response, expectedBody);
            });

            return this;
        },
        run: function(allDone) {
            endAndAssert(expectations, wrapper, allDone);
        }
    }
}

module.exports = createPutChain;
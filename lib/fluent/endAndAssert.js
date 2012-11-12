var assert = function assert(expectations, wrapper, response, allDone) {
    var expectationNames = Object.keys(expectations);

    expectationNames.forEach(function(expectationName) {
        var toRun = expectations[expectationName];

        toRun(response);
    })
}

var endAndAssert = function(expectations, wrapper, allDone) {
    wrapper.onEnd(function(response) {
        try {
            assert(expectations, wrapper, response, allDone)
        } catch (expectationFailure)  {
            allDone(expectationFailure.message);
            return;
        }

        allDone();
    });
}

module.exports = endAndAssert;
var endAndAssert = function(expectations, wrapper, allDone) {
    wrapper.onEnd(function(response) {
        try {
            var expectationNames = Object.keys(expectations);

            expectationNames.forEach(function(expectationName) {
                var expectation = expectations[expectationName];
                expectation(response, allDone);
            })

        } catch (expectationFailure)  {
            allDone(expectationFailure.message);
            return;
        }

        allDone();
    });
}

module.exports = endAndAssert;
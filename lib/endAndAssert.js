var endAndAssert = function(expectations, wrapper, allDone) {
    wrapper.onEnd(function(response) {
        try {

            expectations.forEach(function(expectation) {
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
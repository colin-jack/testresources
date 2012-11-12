var assert = function assert(expectations, wrapper, response, allDone) {
    var expectationNames = Object.keys(expectations);

    expectationNames.forEach(function(expectationName) {
        var toRun = expectations[expectationName];

        toRun(response);
    })
}

// We have a response but we have child chains to run, e.g. one might send a GET request for
// a link in the parent response before doing some validation on that response.
var runIncludingChildChain = function runIncludingChildChain(parentResponse, requestChain, allDone) {
    var childChain = requestChain.childChain;

    var onChildChainDone = function(failureMessage) {
        if (failureMessage) {
            allDone(failureMessage);
            return;
        }
        else
        {
            assert(requestChain.expectations, requestChain.wrapper, parentResponse, allDone);
        }
    }

    childChain.createWrapper(parentResponse);
    sendRequestAndAssertOnResponse(childChain, onChildChainDone)
}

var processResponse = function processResponse(response, requestChain, allDone) {
    try {
        if (requestChain.childChain) {
            runIncludingChildChain(response, requestChain, allDone)
        }
        else
        {
            assert(requestChain.expectations, requestChain.wrapper, response, allDone)
        }
    } catch (expectationFailure)  {
        requestChain.wrapper.closeExpress();

        allDone(expectationFailure.message);
        return;
    }

    requestChain.wrapper.closeExpress();

    allDone();
}

var sendRequestAndAssertOnResponse = function(requestChain, allDone) {
    requestChain.wrapper.onEnd(function(err, response) { 
            if (err) {
                requestChain.wrapper.closeExpress();
                allDone(err);
                return;
            }

            processResponse(response, requestChain, allDone) 
        });
}

module.exports = sendRequestAndAssertOnResponse;
var assert = function assert(expectations, wrapper, response) {
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
    childChain.createWrapper(parentResponse);

    var onChildChainDone = function(failureMessage) {
        if (failureMessage) {
            allDone(failureMessage);
            return;
        }
        else {
            assert(requestChain.expectations, requestChain.wrapper, parentResponse, allDone);
            allDone();
        }
    }

    sendRequestAndAssertOnResponse(childChain, onChildChainDone)
}

var processResponse = function(response, requestChain, allDone) {
    if (requestChain.childChain) {
        runIncludingChildChain(response, requestChain, allDone)
    }
    else
    {
        assert(requestChain.expectations, requestChain.wrapper, response, allDone)
        winston.info("Finished processing response for " + response.req.path);
        requestChain.wrapper.closeExpress();
        allDone();
    }
}

var safeProcessResponse = function safeProcessResponse(response, requestChain, allDone) {
    try {
        processResponse(response, requestChain, allDone);
    } 
    catch (expectationFailure)  {
        allDone(expectationFailure.message);

        return;
    }
}

var sendRequestAndAssertOnResponse = function(requestChain, allDone) {
    requestChain.wrapper.onEnd(function(err, response) { 
            if (err) {
                requestChain.wrapper.closeExpress();
                allDone(err.message);
                return;
            }

            safeProcessResponse(response, requestChain, allDone) 
        });
}

module.exports = sendRequestAndAssertOnResponse;
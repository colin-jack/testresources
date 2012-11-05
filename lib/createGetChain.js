var createGetChain = function(wrapper) {
    var expectations = [];

    return {
        expectGot: function(body) {
            expectations.push(function(response) {
                var bodyComparison = objectcompare(response.body, body);

                if (bodyComparison.equal === false)
                {
                    var message = format("The body looked like '%s' but should looked like '%s'", request.body, body);
                    throw new Error(message);
                }

                if (response.status !== 200) {
                    throw new Error("The status should have been 200.");
                }

                // TODO: Add tests for this
                //assert.match(response.headers["content-type"], /json/, "The body of the response should have been JSON.")
            });

            return this;
        },
        expectStatus: function(status) {
            expectations.push(function(response) {
                assert.equal(response.status, status)
            });

            return this;
        },
        run : function(allDone) {
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
        },
        expectCached: require('./expectCached')
    };
};

module.exports = createGetChain;
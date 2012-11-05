var endAndAssert = require('./endAndAssert'),
    expectCached = require('./expectCached'),
    objectcompare = require('objectcompare'),
    format = require('util').format;

var createGetChain = function createGetChain(wrapper) {
    var expectations = [];

    return {
        expectGot: function(body) {
            expectations.push(function(response) {
                var bodyComparison = objectcompare(response.body, body);

                if (bodyComparison.equal === false)
                {
                    var message = format("The body looked like '%s' but should looked like '%s'", response.body, body);
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
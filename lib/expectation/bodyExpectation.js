var objectcompare = require('objectcompare'),
    format = require('util').format,
    inspect = require('util').inspect;

var bodyExpectation = function(response, expectedBody) {
    var bodyComparison = objectcompare(response.body, expectedBody);

    if (bodyComparison.equal === false)
    {
        var message = format("The body looked like '%s' but should looked like '%s'", inspect(response.body), inspect(expectedBody));
        throw new Error(message);
    }

    // TODO: Add tests for this
    //assert.match(response.headers["content-type"], /json/, "The body of the response should have been JSON.")
};

module.exports = bodyExpectation;
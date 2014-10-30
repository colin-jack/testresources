var ResourceAssertionError = require('./../ResourceAssertionError');
var objectcompare = require('objectcompare');
var format = require('util').format;
var inspect = require('util').inspect;

var bodyExpectation = function(response, expectedBody) {
    var bodyComparison = objectcompare(response.body, expectedBody);

    if (bodyComparison.equal === false)
    {
        var message = format("The body did not match expectations.\r\nActual\r\n'%s'\r\nExpected\r\n'%s'", inspect(response.body), inspect(expectedBody));
        throw new ResourceAssertionError(message);
    }

    // TODO: Add tests for this
    //assert.match(response.headers["content-type"], /json/, "The body of the response should have been JSON.")
};

module.exports = bodyExpectation;
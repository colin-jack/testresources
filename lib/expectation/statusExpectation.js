var objectcompare = require('objectcompare'),
    format = require('util').format;

var statusExpectation = function(response, expectedStatus) {
    if (response.status !== expectedStatus) {
        throw new Error(format("The status should have been %s but was %s.", expectedStatus, response.status));
    }
};

module.exports = statusExpectation;
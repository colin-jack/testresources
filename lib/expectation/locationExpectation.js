var format = require('util').format;
var ResourceAssertionError = require('./../ResourceAssertionError');

var locationExpectation = function(response, expectedLocation) {
    var actualLocation = response.get('location');

    if (expectedLocation !== actualLocation) {
        var message = format("The location value '%s' should have matched '%s'", actualLocation, expectedLocation);

        throw new ResourceAssertionError(message)
    }
};

module.exports = locationExpectation;
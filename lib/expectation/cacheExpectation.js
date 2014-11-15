var format = require('util').format;
var ResourceAssertionError = require('./../ResourceAssertionError');

var expectCached = function(where, minutes, response) {
    var maxAge = "max-age=" + (minutes * 60);
    var regexString = "(.*" + maxAge + ".*" + where +".*)|(.*" + where + ".*" + maxAge + ".*)";

    var cachingRegex = new RegExp(regexString);
    var header = response.get('cache-control');

    // TODO - Also check Expires to keep HTTP 1.0 caches happy
    if (cachingRegex.test(header) === false) {
        var message = format("The cache-control value '%s' should have matched '%s'", response.headers['cache-control'], regexString);
        throw new ResourceAssertionError(message)
    }
};

module.exports = expectCached;
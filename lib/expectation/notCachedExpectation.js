var format = require('util').format;

var notCachedExpectation = function(response) {
    // TODO: no-cache, no-store
    // TODO:  Pragma: no-cache
    var maxAge = "max-age=" + (minutes * 60);
    var regexString = "(.*" + maxAge + ".*" + where +".*)|(.*" + where + ".*" + maxAge + ".*)";

    var cachingRegex = new RegExp(regexString);

    // TODO - Also check Expires to keep HTTP 1.0 caches happy
    if (response.headers['cache-control'].match(cachingRegex) === null) {
        var message = format("The cache-control value '%s' should have matched '%s'", response.headers['cache-control'], regexString);
        throw new Error(message)
    }
};

module.exports = notCachedExpectation
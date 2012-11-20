var format = require('util').format;

var expectCached = function(response) {
    var noCachingRegex = /(.*no-cache.*)/

    // TODO - Also check Expires to keep HTTP 1.0 caches happy
    if (response.headers['cache-control'].match(noCachingRegex) === null) {
        var message = format("The cache-control value '%s' should have matched '%s'", 
                                    response.headers['cache-control'], 
                                    regexString);
        throw new Error(message)
    }
};

module.exports = expectCached;
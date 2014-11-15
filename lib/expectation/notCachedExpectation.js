var format = require('util').format;
var ResourceAssertionError = require('./../ResourceAssertionError');

var expectNotCached = function(response) {
    var noCachingRegex = /(.*no-cache.*)/
    
    var header = response.get('cache-control');
    
    //debugger;

    // TODO - Also check Expires to keep HTTP 1.0 caches happy
    if (noCachingRegex.test(header) === false) {
        var message = format("The cache-control value '%s' should have matched '%s'", 
                                    response.headers['cache-control'], 
                                    noCachingRegex);
        throw new ResourceAssertionError(message)
    }
};

module.exports = expectNotCached;
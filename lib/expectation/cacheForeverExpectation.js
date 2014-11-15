var format = require('util').format;
var ResourceAssertionError = require('./../ResourceAssertionError');

var cacheForeverExpectation = function(where, response) {   
    var cacheControlHeader = response.get('cache-control');
    assertMatchesLocationRegex(where, cacheControlHeader, response)
    
    assertCachedForLongTime(cacheControlHeader);
};

var assertCachedForLongTime = function assertCachedForLongTime(cacheControlHeader) {
    var tenYearsInSeconds = 10 * 365 * 24 * 60 * 60;
    var maxAgeRegex = new RegExp("max-age=([0-9]+)");

    var matches = maxAgeRegex.exec(cacheControlHeader);

    if (matches === null) {
        throw new ResourceAssertionError(format("The cache-control value '%s' should have contained a max-age.", cacheControlHeader))
    }

    var maxAgeSeconds = Number(matches[1]);

    if (maxAgeSeconds < tenYearsInSeconds) {
        var message = format("The cache-control max-age value of '%s' should have been larger than '%s'.", 
                             maxAgeSeconds, tenYearsInSeconds);
        throw new ResourceAssertionError(message)
    }
}

var assertMatchesLocationRegex = function assertMatchesLocationRegex(where, cacheControlHeader, response) {
    var locationRegex = new RegExp("(.*, " + where + ".*)|(.*" + where + ",.*)");
    
    var matches = locationRegex.test(cacheControlHeader);

    // TODO - Also check Expires to keep HTTP 1.0 caches happy
    if (matches === false) {
        var message = format("The cache-control value '%s' should have matched '%s'", response.get('cache-control'), locationRegex);
        throw new ResourceAssertionError(message)
    }
};

module.exports = cacheForeverExpectation;
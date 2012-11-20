var format = require('util').format;

var cacheForeverExpectation = function(where, response) {   
    var cacheControlHeader = response.headers['cache-control'];
    assertMatchesLocationRegex(where, cacheControlHeader, response)
    
    assertCachedForLongTime(cacheControlHeader);
};

var assertCachedForLongTime = function assertCachedForLongTime(cacheControlHeader) {
    var tenYearsInSeconds = 10 * 365 * 24 * 60 * 60;
    var maxAgeRegex = new RegExp("max-age=([0-9]+)");

    var match = cacheControlHeader.match(maxAgeRegex);

    if (match === null) {
        throw new Error(format("The cache-control value '%s' should have contained a max-age.", cacheControlHeader))
    }

    var maxAgeSeconds = Number(match[1]);

    if (maxAgeSeconds < tenYearsInSeconds) {
        var message = format("The cache-control max-age value of '%s' should have been larger than '%s'.", 
                             maxAgeSeconds, tenYearsInSeconds);
        throw new Error(message)
    }
}

var assertMatchesLocationRegex = function assertMatchesLocationRegex(where, cacheControlHeader, response) {
    var locationRegex = new RegExp("(.*, " + where + ".*)|(.*" + where + ",.*)");

    // TODO - Also check Expires to keep HTTP 1.0 caches happy
    if (cacheControlHeader.match(locationRegex) === null) {
        var message = format("The cache-control value '%s' should have matched '%s'", response.headers['cache-control'], locationRegex);
        throw new Error(message)
    }
};

module.exports = cacheForeverExpectation;
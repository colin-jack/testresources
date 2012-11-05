module.exports = function(where, minutes) {
    var maxAge = "max-age=" + (minutes * 60);
    var regexString = "(.*" + maxAge + ".*" + where +".*)|(.*" + where + ".*" + maxAge + ".*)";

    expectations.push(function(response, allDone) {
        var cachingRegex = new RegExp(regexString);

        if (response.headers['cache-control'].match(cachingRegex) == null) {
            var message = format("The cache-control value '%s' should have matched '%s'", response.headers['cache-control'], regexString);
            throw new Error(message)
        }
    });

    return this;
};
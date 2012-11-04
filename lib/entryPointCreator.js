var RequestWrapper = require('./RequestWrapper'),
    superTest = require('supertest'),
    assert = require('chai').assert,
    format = require('util').format,
    http = require('http'),
    objectcompare = require('objectcompare');

var createGetChain = function(wrapper) {
    var expectations = [];

    return {
        expectGot: function(body) {
            expectations.push(function(response) {
                var bodyComparison = objectcompare(response.body, body);

                if (bodyComparison.equal === false)
                {
                    var message = format("The body looked like '%s' but should looked like '%s'", request.body, body);
                    throw new Error(message);
                }

                if (response.status !== 200) {
                    throw new Error("The status should have been 200.");
                }

                // TODO: Add tests for this
                //assert.match(response.headers["content-type"], /json/, "The body of the response should have been JSON.")
            });

            return this;
        },
        expectStatus: function(status) {
            expectations.push(function(response) {
                assert.equal(response.status, status)
            });

            return this;
        },
        run : function(allDone) {
            wrapper.onEnd(function(response) {
                try {
                    expectations.forEach(function(expectation) {
                        expectation(response, allDone);
                    })

                } catch (expectationFailure)  {
                    allDone(expectationFailure.message);
                    return;
                }

                allDone();
            });        
        },
        expectCached: function(where, minutes) {
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
        },
    };
};

module.exports = function(expressApp, port) {
    expressApp = http.createServer(expressApp);

    return {
        get: function(relativeUrl) {
            var wrapper = new RequestWrapper(expressApp, "get", relativeUrl);
            
            if (port) {
                wrapper.port = port;
            }

            return createGetChain(wrapper);
        },
        // put: function(url, body) {
        //     debugger;
        //     var callChain = wrappedSuperTest.put(url, body);//.expect('Content-Type', /json/);
        //     return createChainable(callChain);  
        // }
    };
};

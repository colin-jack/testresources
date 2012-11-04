var RequestWrapper = require('./RequestWrapper'),
    superTest = require('supertest'),
    assert = require('chai').assert,
    http = require('http');

var createGetChain = function(wrapper) {
    var expectations = [];

    return {
        expectGot: function(body) {
            expectations.push(function(response) {
                assert.deepEqual(response.body, body, "The body of the response was not what was expected.")
                assert.equal(response.status, 200)
                assert.match(response.headers["content-type"], /json/, "The body of the response should have been JSON.")
            });

            return this;
        },
        assert : function(allDone) {
            wrapper.onEnd(function(response) {
                expectations.forEach(function(expectation) {
                    expectation(response);
                })

                allDone();
            });        
        },
        expectCached: function(where, minutes) {
            var maxAge = "max-age=" + (minutes * 60);
            var regexString = "(.*" + maxAge + ".*" + where +".*)|(.*" + where + ".*" + maxAge + ".*)";

            expectations.push(function(response) {
                assert.match(response.headers['cache-control'], new RegExp(regexString));
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

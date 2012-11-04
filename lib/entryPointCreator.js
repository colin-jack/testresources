var supertest = require('supertest');

var createChainable = function(callChain) {
    return {
        expectBody: function(body) {
            callChain = callChain.expect(200, body);
            return this;
        },
        expectStatus : function(statusCode) {
            callChain.expect(statusCode);
            return this;
        },
        expectCached: function(where, minutes) {
            var maxAge = "max-age=" + (minutes * 60);
            var regexString = "(.*" + maxAge + ".*" + where +".*)|(.*" + where + ".*" + maxAge + ".*)";
            
            callChain.expect('Cache-Control', new RegExp(regexString));

            return this;
        },
        end: function(validate) {
            var onEnd = function(err, res) {
                debugger;
                if (validate) {
                    validate(err, res);
                    return;
                }
                if (err) {
                    throw err;
                }
            };

            callChain.end(onEnd);
        }
    };
};

module.exports = function(express) {
    var wrappedSuperTest = supertest(express);

    return {
        get: function(url) {
            var callChain = wrappedSuperTest.get(url).expect('Content-Type', /json/);
            return createChainable(callChain);
        },
        put: function(url, body) {
            var callChain = wrappedSuperTest.put(url).send(body);
            return createChainable(callChain);
        }
    };
};

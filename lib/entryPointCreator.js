var supertest = require('supertest');

var createChainable = function(callChain) {
    return {
        expectBody: function(body) {
            callChain = callChain.expect(200, body);
            return this;
        },
        expectCached: function(where, minutes) {
            var seconds = minutes * 60;
            callChain.expect('Cache-Control', new RegExp(where)).expect('Cache-Control', new RegExp("max-age=" + seconds));

            return this;
        },
        end: function(validate) {
            var onEnd = function(err, res) {
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
        }
    };
};

var expectCached = require('./../expectation/cacheExpectation'),
    sharedFluentInterface = require('./sharedFluentInterface');

var createGetChain = function createGetChain(wrapper) {
    var getOnly = {
        expectations: {
            value : {}
        },
        wrapper: { 
            value : wrapper
        },
        expectCached: { 
            value: function(where, minutes) {
                this.expectations["caching"] = function(response) {
                    expectCached(where, minutes, response);
                }

                return this;
            }
        }
    }

    return Object.create(sharedFluentInterface, getOnly);
};

module.exports = createGetChain;
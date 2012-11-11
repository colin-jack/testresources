var cacheExpectation = require('./../expectation/cacheExpectation'),
    sharedFluentInterface = require('./sharedFluentInterface'),
    noCacheExpectation = require('./../expectation/noCacheExpectation');

var createGetChain = function createGetChain(wrapper) {
    var getOnly = {
        expectations: { value : {} },
        wrapper: { value : wrapper },

        expectNotCached: {
            value: function() {
                this.expectations["caching"] = function(response) {
                    noCacheExpectation(response);
                }
                return this;
            }
        },

        expectCached: { 
            value: function(where, minutes) {
                this.expectations["caching"] = function(response) {
                    cacheExpectation(where, minutes, response);
                }

                return this;
            }
        }
    }

    return Object.create(sharedFluentInterface, getOnly);
};

module.exports = createGetChain;
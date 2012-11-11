var cacheExpectation = require('./../expectation/cacheExpectation'),
    sharedFluentInterface = require('./sharedFluentInterface'),
    noCacheExpectation = require('./../expectation/noCacheExpectation');

var expectNotCached = function expectNotCached() {
    this.expectations["caching"] = function(response) {
        noCacheExpectation(response);
    }
    return this;
};

var expectCached = function expectCached(where, minutes) {
    this.expectations["caching"] = function(response) {
        cacheExpectation(where, minutes, response);
    }

    return this;
};

var createGetChain = function createGetChain(wrapper) {
    var getOnly = {
        expectations: { value : {} },
        wrapper: { value : wrapper },

        expectNotCached: { value: expectNotCached },

        followLink: {
            value: function(linkRel) {
                // return new 

                // return 
            }  
        },

        expectCached: { value: expectCached }
    }

    return Object.create(sharedFluentInterface, getOnly);
};

module.exports = createGetChain;
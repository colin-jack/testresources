var cacheExpectation = require('./../expectation/cacheExpectation'),
    sharedFluentInterface = require('./sharedFluentInterface'),
    noCacheExpectation = require('./../expectation/noCacheExpectation'),
    sendRequestAndAssertOnResponse = require('./sendRequestAndAssertOnResponse'),
    cacheForeverExpectation = require('./../expectation/cacheForeverExpectation');

var run = function(allDone) {
    sendRequestAndAssertOnResponse(this, allDone);
}

var expectNotCached = function expectNotCached() {
    this.expectations.caching = function(response) {
        noCacheExpectation(response);
    }
    return this;
};

var registerChildChain = function registerChildChain(childChain) {
    this.childChain = childChain;
}

var expectCached = function expectCached(where, minutes) {
    this.expectations.caching = function(response) {
        cacheExpectation(where, minutes, response);
    }

    return this;
};

var expectCachedForever = function expectCached(where) {   
    this.expectations.caching = function(response) {
        cacheForeverExpectation(where, response);
    }

    return this;
};

var followLink = function followLink(linkRel) {
    var createFollowLinkChain = require('./createFollowLinkChain');

    return createFollowLinkChain(linkRel, this, this.wrapperFactory);
}

var createGetChain = function createGetChain(wrapper, wrapperFactory) {
    var getChain = Object.create(sharedFluentInterface);

    getChain.expectations = {};

    getChain.wrapper = wrapper;
    getChain.wrapperFactory = wrapperFactory;

    getChain.expectNotCached = expectNotCached;
    getChain.followLink = followLink;
    getChain.expectCached = expectCached;
    getChain.registerChildChain = registerChildChain;
    getChain.expectCachedForever = expectCachedForever;

    getChain.run = run;

    return getChain;
};

module.exports = createGetChain;
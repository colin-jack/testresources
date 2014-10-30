var testresources = require('require-namespace').testresources;
var cacheExpectation = testresources.require('cacheExpectation'),
    sharedFluentInterface = require('./sharedFluentInterface'),
    notCachedExpectation = testresources.require('notCachedExpectation'),
    sendRequestAndAssertOnResponse = require('./sendRequestAndAssertOnResponse'),
    cacheForeverExpectation = testresources.require('cacheForeverExpectation'),
    notCachedExpectation = testresources.require('notCachedExpectation'),
    ensure = require('rules').ensure;

var run = function(allDone) {
    sendRequestAndAssertOnResponse(this, allDone);
}

var registerChildChain = function registerChildChain(childChain) {
    this.childChain = childChain;
}

var expectNotCached = function expectNotCached() {
    this.expectations.caching = function(response) {
        notCachedExpectation(response);
    }
    return this;
};

var expectCached = function expectCached(where, minutes) {
    //ensure(where).populated().string();
    //ensure(minutes).populated().numeric();

    this.expectations.caching = function(response) {
        cacheExpectation(where, minutes, response);
    }

    return this;
};

var expectCachedForever = function expectCached(where) {   
    // TODO: Validate where against enum.
    //ensure(where).populated().string();

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
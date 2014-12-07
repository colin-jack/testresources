var testResources = require('require-namespace').testResources;

var cacheExpectation = testResources.cacheExpectation;
var notCachedExpectation = testResources.notCachedExpectation;
var cacheForeverExpectation = testResources.cacheForeverExpectation;

var sharedFluentInterface = require('./sharedFluentInterface');
var sendRequestAndAssertOnResponse = require('./sendRequestAndAssertOnResponse');

var ensure = require('rules').ensure;

var registerChildChain = function registerChildChain(childChain) {
    this.childChain = childChain;
}

var expectCached = function expectCached(where, minutes) {
    ensure(where, "where").populated().string();
    ensure(minutes, "minutes").populated().integer();

    // TODO: Exception if incompatible expectations
    this.expectations.caching = function(response) {
        cacheExpectation(where, minutes, response);
    }

    return this;
};

var expectCachedForever = function expectCached(where) {   
    // TODO: Validate where against enum.
    //ensure(where).populated().string();

    this.expectations.caching = function (response) {
        cacheForeverExpectation(where, response);
    }

    return this;
};

var followLink = function followLink(linkRel) {
    var createFollowLinkChain = require('./createFollowLinkChain');

    return createFollowLinkChain(linkRel, this, this.requestFactory);
}

var createGetChain = function createGetChain() {
    var getChain = Object.create(sharedFluentInterface);

    getChain.expectations = {};

    getChain.followLink = followLink;
    getChain.expectCached = expectCached;
    getChain.registerChildChain = registerChildChain;
    getChain.expectCachedForever = expectCachedForever;

    return getChain;
};

module.exports = createGetChain;
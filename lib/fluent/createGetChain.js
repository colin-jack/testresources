// TODO: Only use namespace

var testResources = require('require-namespace').testResources;
var cacheExpectation = testResources.require('cacheExpectation'),
    sharedFluentInterface = require('./sharedFluentInterface'),
    notCachedExpectation = testResources.require('notCachedExpectation'),
    sendRequestAndAssertOnResponse = require('./sendRequestAndAssertOnResponse'),
    cacheForeverExpectation = testResources.require('cacheForeverExpectation'),
    notCachedExpectation = testResources.require('notCachedExpectation'),
    ensure = require('rules').ensure;

var registerChildChain = function registerChildChain(childChain) {
    this.childChain = childChain;
}

var expectNotCached = function expectNotCached() {
    this.expectations.caching = function(response) {
        notCachedExpectation(response);
    }
    return this;
};

// TODO: Common
var expectCached = function expectCached(where, minutes) {
    //ensure(where).populated().string();
    //ensure(minutes).populated().numeric();
    // TODO: Exception if incompatible expectations
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

    return createFollowLinkChain(linkRel, this, this.requestFactory);
}

var createGetChain = function createGetChain() {
    var getChain = Object.create(sharedFluentInterface);

    getChain.expectations = {};

    getChain.expectNotCached = expectNotCached;
    getChain.followLink = followLink;
    getChain.expectCached = expectCached;
    getChain.registerChildChain = registerChildChain;
    getChain.expectCachedForever = expectCachedForever;

    return getChain;
};

module.exports = createGetChain;
var superAgent = require('superagent');

var testResources = require('require-namespace').testResources;
var getServerAddress = testResources.getServerAddress;

var createGetChain = require('./createGetChain'),
    sendRequestAndAssertOnResponse = require('./sendRequestAndAssertOnResponse');

var returnToPreviousChain = function returnToPreviousChain() {
    this.previousChain.registerChildChain(this);

    return this.previousChain;
}

/* 
We assume that the URL will be in a property of thre response, the property name being
the "rel" value of the link
*/
var prepareForVerification = function(response) {
    var relativeUrl = response.body[this.linkRel]
    var superAgentRequest = superAgent.get(relativeUrl);

    this.superAgentRequest = superAgentRequest;
}

var createFollowLinkChain = function createFollowLinkChain(linkRel, previousChain, requestFactory) {
    // TODO: Populate request config
    // TODO: Consider if we need to pass in request factory.
    var followLinkChain = Object.create(createGetChain(null, requestFactory));
    
    followLinkChain.endLink = returnToPreviousChain;
    followLinkChain.previousChain = previousChain;
    followLinkChain.linkRel = linkRel;
    followLinkChain.prepareForVerification = prepareForVerification;

    followLinkChain.request = previousChain.request;

    return followLinkChain;
};

module.exports = createFollowLinkChain;
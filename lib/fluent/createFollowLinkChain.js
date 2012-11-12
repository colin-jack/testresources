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
var createWrapper = function createWrapper(response) {
    var relativeUrl = response.body[this.linkRel]

    debugger;
    this.wrapper = this.wrapperFactory("get", relativeUrl);
}

var createFollowLinkChain = function createFollowLinkChain(linkRel, previousChain, wrapperFactory) {
    // TODO: Consider if we need to pass in wrapper factory.
    var followLinkChain = Object.create(createGetChain(null, wrapperFactory));
    
    followLinkChain.endLink = returnToPreviousChain;
    followLinkChain.previousChain = previousChain;
    followLinkChain.linkRel = linkRel;
    followLinkChain.createWrapper = createWrapper;

    followLinkChain.wrapper = previousChain.wrapper;

    return followLinkChain;
};

module.exports = createFollowLinkChain;
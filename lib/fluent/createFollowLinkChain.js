var createGetChain = require('./createGetChain'),
    sendRequestAndAssertOnResponse = require('./sendRequestAndAssertOnResponse');

var returnToPreviousChain = function returnToPreviousChain() {
    this.previousChain.registerChildChain(this);

    return this.previousChain;
}

// var run = function(done) {
//     // we have the original response so we can parse it for the link we need
//     sendRequestAndAssertOnResponse(this.expectations, this.wrapper, done);
// }

// we assume that the URL will be in a property of thre response, the property name being
// the "rel" value of the link
var createWrapper = function createWrapper(response) {
    var relativeUrl = response.body[this.linkRel]

    console.log("About to request: " + relativeUrl)

    this.wrapper = this.wrapperFactory("get", relativeUrl);
}

var createFollowLinkChain = function createFollowLinkChain(linkRel, previousChain, wrapperFactory) {
    // TODO: Consider if we need to pass in wrapper factory.
    var followLinkChain = Object.create(createGetChain(null, wrapperFactory));
    
    followLinkChain.endLink = returnToPreviousChain;
    followLinkChain.previousChain = previousChain;
    followLinkChain.linkRel = linkRel;
    //followLinkChain.run = run;
    followLinkChain.createWrapper = createWrapper;

    followLinkChain.wrapper = previousChain.wrapper;

    return followLinkChain;
};

module.exports = createFollowLinkChain;
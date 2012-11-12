var createGetChain = require('./createGetChain'),
    endAndAssert = require('./endAndAssert');

var returnToPreviousChain = function returnToPreviousChain() {
    this.previousChain.registerChildChain(this);

    return this.previousChain;
}

var run = function(done) {
    debugger;
    endAndAssert(this.expectations, this.wrapper, done);
}

var createFollowLinkChain = function createFollowLinkChain(linkRel, previousChain) {
    var followLinkChain = Object.create(createGetChain());
    
    followLinkChain.endLink = returnToPreviousChain;
    followLinkChain.previousChain = previousChain;
    followLinkChain.linkRel = linkRel;
    followLinkChain.run = run;

    followLinkChain.wrapper = previousChain.wrapper;

    return followLinkChain;
};

module.exports = createFollowLinkChain;
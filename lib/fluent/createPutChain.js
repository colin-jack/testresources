var sharedFluentInterface = require('./sharedFluentInterface'),
    sendRequestAndAssertOnResponse = require('./sendRequestAndAssertOnResponse')

var run = function run(allDone) {
    sendRequestAndAssertOnResponse(this.expectations, this.wrapper, allDone);
}

var createPutChain = function(wrapper) {
    var putChain = Object.create(sharedFluentInterface);

    putChain.expectations = {};
    putChain.wrapper = wrapper;
    putChain.expectStatus(200);
    putChain.run = run;

    return putChain;
}

module.exports = createPutChain;
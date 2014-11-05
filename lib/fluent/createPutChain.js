var sharedFluentInterface = require('./sharedFluentInterface');

var createPutChain = function() {
    var putChain = Object.create(sharedFluentInterface);

    putChain.expectations = {};

    putChain.requestConfig = requestConfig;
    
    putChain.expectStatus(200);

    return putChain;
}

module.exports = createPutChain;
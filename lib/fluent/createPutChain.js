var sharedFluentInterface = require('./sharedFluentInterface')

var createPutChain = function(wrapper) {
    var putOnly = {
        expectations: { value : {} },
        wrapper: { value : wrapper }
    }

    var putFluentInterface = Object.create(sharedFluentInterface, putOnly);
    putFluentInterface.expectStatus(200);
    return putFluentInterface;
}

module.exports = createPutChain;
var sharedFluentInterface = require('./sharedFluentInterface')

var createPutChain = function(wrapper) {
    var putOnly = {
        expectations: { value : {} },
        wrapper: { value : wrapper }
    }

    return Object.create(sharedFluentInterface, putOnly);
}

module.exports = createPutChain;
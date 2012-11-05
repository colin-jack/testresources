var endAndAssert = require('./endAndAssert');

var createPutChain = function(wrapper) {
    var expectations = [];

    return {
        run: function(allDone) {
            endAndAssert(expectations, wrapper, allDone);
        }
    }
}

module.exports = createPutChain;
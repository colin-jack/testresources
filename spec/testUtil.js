module.exports = {
   assertError : function(expectedMessage, done) {
        return function(err) {
            assert.isDefined(err, "Did not expect there to have been an error but got: " + err)
            // var util = require('util');
            // util.log(util.inspect(err));
            assert.match(err, expectedMessage);
            done();
        }
    },

    assertNoError : function(done) {
        return function(err, res) {
            assert.isUndefined(err);
            done();
        }
    }
}
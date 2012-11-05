module.exports = {
   assertError : function(expectedMessage, done) {
        return function(err) {
            assert.isDefined(err, "Did not expect there to have been an error but got: " + err)
            
            if (expectedMessage instanceof RegExp) {
                assert.match(err, expectedMessage);
                done();
            }
            else {
                expectedMessage();
            }
            
        }
    },

    assertNoError : function(done) {
        return function(err, res) {
            assert.isUndefined(err);
            done();
        }
    }
}
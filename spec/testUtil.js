module.exports = {
   assertError : function(done) {
        return function(err, res) {
            debugger;
            assert.isDefined(err, "Did not expect there to have been an error but got: " + err)
            //assert.instanceOf(err, Error);
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
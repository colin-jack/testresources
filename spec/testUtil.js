module.exports = {
   assertErrorRaised : function(err, res) {
        assert.isDefined(err)
        assert.instanceOf(err, Error);
    }
}
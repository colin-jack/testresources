var entryPoint = lib.require('entryPoint')

describe('when you get the entry point', function() {
    var underTest;

    beforeEach(function() {
        underTest = entryPoint({});
    });

     it('should have expected functions', function() {
        assert.isFunction(underTest.getJSON);        
    });
});

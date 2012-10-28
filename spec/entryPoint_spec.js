var entryPoint;

entryPoint = lib.require('entryPointCreator');

describe('when you get the entry point', function() {
  var underTest;
  underTest = null;
  beforeEach(function() {
    return underTest = entryPoint({});
  });
  return it('should have expected functions', function() {
    return assert.isFunction(underTest.get);
  });
});

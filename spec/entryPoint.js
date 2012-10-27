var entryPoint;

entryPoint = lib.require('entryPoint');

describe('when you get the entry point', function() {
  beforeEach(function() {
    var underTest;
    return underTest = entryPoint({});
  });
  return it('should have expected functions', function() {
    return assert.isFunction(underTest.get);
  });
});

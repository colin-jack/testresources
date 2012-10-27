var entryPoint, sinon;

entryPoint = lib.require('entryPoint');

sinon = require('sinon');

describe('when you ask for a get request', function() {
  beforeEach(function() {
    var superTest, superTestSpy;
    superTest = {
      get: function() {}
    };
    superTestSpy = sinon.stub(superTest, "get");
    return entryPoint(superTestSpy).get('/boo');
  });
  return it('should call super test to ask it to make the get request', function() {
    return assert.isTrue(superTestSpy.called);
  });
});

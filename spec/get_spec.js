var entryPoint, sinon;

entryPoint = lib.require('entryPoint');

sinon = require('sinon');

describe('when you ask for a get request', function() {
  var superTestSpy;
  superTestSpy = null;
  beforeEach(function() {
    var superTest;
    superTest = {
      get: function() {}
    };
    superTestSpy = sinon.stub(superTest, "get");
    return entryPoint(superTest).get('/boo');
  });
  return it('should call super test to ask it to make the get request', function() {
    assert.isTrue(superTestSpy.called);
    return assert.equal(superTestSpy.firstCall.args[0], '/boo');
  });
});

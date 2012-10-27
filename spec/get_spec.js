var entryPoint, sinon;

entryPoint = lib.require('entryPoint');

sinon = require('sinon');

describe('when you ask for a get request', function() {
  var expectSpy, getSpy;
  expectSpy = getSpy = null;
  beforeEach(function() {
    var ghostie, superTest;
    superTest = {
      get: function() {
        return this;
      },
      expect: function() {
        return this;
      }
    };
    getSpy = sinon.spy(superTest, "get");
    expectSpy = sinon.spy(superTest, "expect");
    ghostie = {
      name: "casper"
    };
    return entryPoint(superTest).get('/boo').expect(ghostie);
  });
  it('should call super test to ask it to make the get request', function() {
    assert.isTrue(getSpy.called);
    return assert.equal(getSpy.firstCall.args[0], '/boo');
  });
  it('should expect content-type to be JSON', function() {
    return assert(expectSpy.calledWith('Content-Type', 'text/json'));
  });
  return it('should expect response to be 200', function() {
    return assert(expectSpy.calledWith('Content-Type', 'text/json'));
  });
});

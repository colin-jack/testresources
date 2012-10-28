var entryPoint, sinon;

entryPoint = lib.require('entryPoint');

sinon = require('sinon');

describe('when you make a get request', function() {
  var expectSpy, getSpy, returnedFromGet;
  returnedFromGet = expectSpy = getSpy = null;
  beforeEach(function() {
    var superTest;
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
    return returnedFromGet = entryPoint(superTest).get('/boo');
  });
  it('should call super test to ask it to make the get request', function() {
    assert.isTrue(getSpy.called);
    return assert.equal(getSpy.firstCall.args[0], '/boo');
  });
  it('should expect content-type to be JSON', function() {
    return assert(expectSpy.calledWith('Content-Type', 'text/json'));
  });
  return describe('when you add expectation to the get', function() {
    var ghostie;
    ghostie = null;
    beforeEach(function() {
      ghostie = {
        name: "casper"
      };
      return returnedFromGet.expectBody(ghostie);
    });
    return it('should expect response to be 200', function() {
      return assert(expectSpy.calledWith(200));
    });
  });
});

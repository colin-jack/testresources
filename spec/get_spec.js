var createSpyHelper, entryPoint;

entryPoint = lib.require('entryPoint');

createSpyHelper = require('./createSuperTestSpyHelper');

describe('when you make a get request', function() {
  var returnedFromGet, spyHelper;
  returnedFromGet = spyHelper = null;
  beforeEach(function() {
    spyHelper = createSpyHelper();
    return returnedFromGet = entryPoint(spyHelper.fakeSuperTest).get('/boo');
  });
  it('should call super test to ask it to make the get request', function() {
    assert.isTrue(spyHelper.getSpy.called);
    return assert.equal(spyHelper.getSpy.firstCall.args[0], '/boo');
  });
  it('should expect content-type to be JSON', function() {
    return assert(spyHelper.expectSpy.calledWith('Content-Type', 'text/json'));
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
    it('should expect response to be 200 and should include body to be verified', function() {
      return spyHelper.assertExpectCalledWith(200, ghostie);
    });
    return it('should expect response to be json', function() {
      return spyHelper.assertFirstCalledWithValueMatching('Content-Type', /json/);
    });
  });
});

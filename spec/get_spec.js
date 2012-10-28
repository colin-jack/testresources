var entryPoint = lib.require('entryPointCreator');
var createSpyHelper = require('./createSuperTestSpyHelper');

describe('when you make a get request', function() {
  var returnedFromGet = spyHelper = null;

  beforeEach(function() {
    spyHelper = createSpyHelper();
    returnedFromGet = entryPoint(spyHelper.fakeSuperTest).get('/boo');
  });

  it('should call super test to ask it to make the get request', function() {
    assert.isTrue(spyHelper.getSpy.called);
    assert.equal(spyHelper.getSpy.firstCall.args[0], '/boo');
  });

  it('should expect content-type to be JSON', function() {
    assert(spyHelper.expectSpy.calledWith('Content-Type', /json/));
  });

  describe('when you add expectation to the get', function() {
    var ghostie = null;

    beforeEach(function() {
      ghostie = {
        name: "casper"
      };

      returnedFromGet.expectBody(ghostie);
    });

    it('should expect response to be 200 and should include body to be verified', function() {
      spyHelper.assertExpectCalledWith(200, ghostie);
    });
  });
});

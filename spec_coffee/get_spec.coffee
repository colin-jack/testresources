entryPoint = lib.require('entryPointCreator')
createSpyHelper = require('./createSuperTestSpyHelper')

describe 'when you make a get request', () ->
  returnedFromGet = spyHelper = null

  beforeEach () ->
    spyHelper = createSpyHelper();
    
    returnedFromGet = entryPoint(spyHelper.fakeSuperTest).get('/boo')

  it 'should call super test to ask it to make the get request', () ->
    assert.isTrue spyHelper.getSpy.called
    assert.equal spyHelper.getSpy.firstCall.args[0], '/boo'

  it 'should expect content-type to be JSON', () ->
    assert spyHelper.expectSpy.calledWith 'Content-Type', 'text/json'

  describe 'when you add expectation to the get', () ->
    ghostie = null

    beforeEach () ->
      ghostie = 
        name: "casper"
  
      returnedFromGet.expectBody(ghostie)
  
    it 'should expect response to be 200 and should include body to be verified', () ->
      spyHelper.assertExpectCalledWith 200, ghostie
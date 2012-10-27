entryPoint = lib.require('entryPoint')
sinon = require('sinon')

describe 'when you ask for a get request', () ->
  superTestSpy = null

  beforeEach () ->
    superTest = 
      get : () -> 

    superTestSpy = sinon.stub(superTest, "get")
    entryPoint(superTest).get('/boo')

  it 'should call super test to ask it to make the get request', () ->
    assert.isTrue superTestSpy.called
    assert.equal superTestSpy.firstCall.args[0], '/boo'
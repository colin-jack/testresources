entryPoint = lib.require('entryPoint')
sinon = require('sinon')

describe 'when you ask for a get request', () ->
  beforeEach () ->
    superTest = 
      get : () -> 

    superTestSpy = sinon.stub(superTest, "get")
    entryPoint(superTestSpy).get('/boo')

  it 'should call super test to ask it to make the get request', () ->
    assert.isTrue(superTestSpy.called);        
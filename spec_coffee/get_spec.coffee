entryPoint = lib.require('entryPoint')
sinon = require('sinon')

describe 'when you make a get request', () ->
  returnedFromGet = expectSpy = getSpy = null

  beforeEach () ->
    superTest = 
      get : () -> 
        @
      expect: () ->
        @

    getSpy = sinon.spy(superTest, "get")
    expectSpy = sinon.spy(superTest, "expect")
    
    returnedFromGet = entryPoint(superTest).get('/boo')

  it 'should call super test to ask it to make the get request', () ->
    assert.isTrue getSpy.called
    assert.equal getSpy.firstCall.args[0], '/boo'

  it 'should expect content-type to be JSON', () ->
    assert expectSpy.calledWith 'Content-Type', 'text/json'

  describe 'when you add expectation to the get', () ->
    ghostie = null

    beforeEach () ->
      ghostie = 
        name: "casper"
  
      returnedFromGet.expectBody(ghostie)
  
    it 'should expect response to be 200', () ->
      assert expectSpy.calledWith 200
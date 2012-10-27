entryPoint = lib.require('entryPoint')
sinon = require('sinon')

describe 'when you ask for a get request', () ->
  expectSpy = getSpy = null

  beforeEach () ->
    superTest = 
      get : () -> 
        @
      expect: () ->
        @

    getSpy = sinon.spy(superTest, "get")
    expectSpy = sinon.spy(superTest, "expect")

    ghostie = 
      name: "casper"
    
    entryPoint(superTest).get('/boo').expect(ghostie)

  it 'should call super test to ask it to make the get request', () ->
    assert.isTrue getSpy.called
    assert.equal getSpy.firstCall.args[0], '/boo'

  it 'should expect content-type to be JSON', () ->
    assert expectSpy.calledWith 'Content-Type', 'text/json'

  it 'should expect response to be 200', () ->
    assert expectSpy.calledWith 'Content-Type', 'text/json'
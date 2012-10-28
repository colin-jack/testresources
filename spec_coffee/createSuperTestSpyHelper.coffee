sinon = require('sinon')

module.exports = () ->
  assertExpectCalledWith = (key, value) ->
    assert expectSpy.calledWith(key, value)

  assertFirstCalledWithValueMatching = (key, regex) ->
    assert.equal expectSpy.firstCall.args[0], key
    assert.match expectSpy.firstCall.args[1], regex


  fakeSuperTest =
    get : () -> 
      @
    expect: () ->
      @
    address: () ->
      "foo.com"

  getSpy = sinon.spy(fakeSuperTest, "get")
  expectSpy = sinon.spy(fakeSuperTest, "expect")

  return {
    fakeSuperTest : fakeSuperTest,
    assertExpectCalledWith : assertExpectCalledWith
    getSpy : getSpy,
    assertFirstCalledWithValueMatching : assertFirstCalledWithValueMatching,
    expectSpy : expectSpy
  }
sinon = require('sinon')

module.exports = () ->
  fakeSuperTest =
    get : () -> 
      @
    expect: () ->
      @

  getSpy = sinon.spy(fakeSuperTest, "get")
  expectSpy = sinon.spy(fakeSuperTest, "expect")

  return {
    fakeSuperTest : fakeSuperTest,
    getSpy : getSpy,
    expectSpy : expectSpy
  }
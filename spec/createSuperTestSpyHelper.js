var sinon;

sinon = require('sinon');

module.exports = function() {
  var assertExpectCalledWith, assertFirstCalledWithValueMatching, expectSpy, fakeSuperTest, getSpy;
  assertExpectCalledWith = function(key, value) {
    return assert(expectSpy.calledWith(key, value));
  };
  assertFirstCalledWithValueMatching = function(key, regex) {
    assert.equal(expectSpy.firstCall.args[0], key);
    return assert.match(expectSpy.firstCall.args[1], regex);
  };
  fakeSuperTest = {
    get: function() {
      return this;
    },
    expect: function() {
      return this;
    },
    address: function() {
      return "foo.com";
    }
  };
  getSpy = sinon.spy(fakeSuperTest, "get");
  expectSpy = sinon.spy(fakeSuperTest, "expect");
  return {
    fakeSuperTest: fakeSuperTest,
    assertExpectCalledWith: assertExpectCalledWith,
    getSpy: getSpy,
    assertFirstCalledWithValueMatching: assertFirstCalledWithValueMatching,
    expectSpy: expectSpy
  };
};

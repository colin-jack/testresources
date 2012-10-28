var sinon = require('sinon');

module.exports = function() {
  var assertExpectCalledWith = function(key, value) {
    return assert(expectSpy.calledWith(key, value));
  };

  var assertFirstCalledWithValueMatching = function(key, regex) {
    assert.equal(expectSpy.firstCall.args[0], key);
    return assert.match(expectSpy.firstCall.args[1], regex);
  };

  var fakeSuperTest = {
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
  
  var getSpy = sinon.spy(fakeSuperTest, "get");
  var expectSpy = sinon.spy(fakeSuperTest, "expect");

  return {
    fakeSuperTest: fakeSuperTest,
    assertExpectCalledWith: assertExpectCalledWith,
    getSpy: getSpy,
    assertFirstCalledWithValueMatching: assertFirstCalledWithValueMatching,
    expectSpy: expectSpy
  };
};

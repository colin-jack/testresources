module.exports = function() {
  var expectSpy, fakeSuperTest, getSpy;

  fakeSuperTest = {
    get: function() {
      return this;
    },
    expect: function() {
      return this;
    }
  };

  getSpy = sinon.spy(fakeSuperTest, "get");
  expectSpy = sinon.spy(fakeSuperTest, "expect");
  
  return {
    fakeSuperTest: fakeSuperTest,
    getSpy: getSpy,
    expectSpy: expectSpy
  };
};

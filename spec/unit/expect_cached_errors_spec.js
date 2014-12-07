var fixture = require('./../testFixture');
var assert = fixture.assert;
var createGetChain = fixture.testResources.createGetChain;

describe("when where value is not a string", function () {
    var ExpectedError = /The 'where' value must be a string./;

    it("should throw an error", function () {
        var getChain = createGetChain();
        assert.throws(function () { getChain.expectCached(5, 5) }, ExpectedError);
    });

    it("should throw an error", function () {
        var getChain = createGetChain();
        assert.throws(function () { getChain.expectCached(undefined, 5) }, /The 'where' value must be populated./);
    });

    it("should throw an error", function () {
        var getChain = createGetChain();
        assert.throws(function () { getChain.expectCached(false, 5) }, ExpectedError);
    });
});

describe("when the minutes value is not an integer", function () {
    var ExpectedNotIntegerError = /The 'minutes' value must be numeric./;
    
    it("should throw an error if it is a double", function () {
        var getChain = createGetChain();
        assert.throws(function () { getChain.expectCached("public", 5.1) }, /The 'minutes' value must be an integer./);
    });
    
    it("should throw an error", function () {
        var getChain = createGetChain();
        assert.throws(function () { getChain.expectCached("public", false) }, ExpectedNotIntegerError);
    });
    
    it("should throw an error if it is a string", function () {
        var getChain = createGetChain();
        assert.throws(function () { debugger; getChain.expectCached("public", "5") }, "The 'minutes' value must be an integer.");
    });
});
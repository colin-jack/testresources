var fixture = require('./../testFixture');
var assert = fixture.assert;
var createPostChain = fixture.testResources.createPostChain;

describe("when location is not a string", function () {
    var ExpectedError = /The 'location' value must be a string./;
    
    it("should throw an error", function () {
        var postChain = createPostChain();
        assert.throws(function () { postChain.expectLocation(5) }, ExpectedError);
    });
    
    it("should throw an error", function () {
        var postChain = createPostChain();
        assert.throws(function () { postChain.expectLocation(undefined) }, /The 'location' value must be populated./);
    });
    
    it("should throw an error", function () {
        var postChain = createPostChain();
        assert.throws(function () { postChain.expectLocation(false) }, ExpectedError);
    });
});

describe("when location is not a URL", function () {
    var ExpectedError = /The 'where' value must be a string./;
    
    it("should throw an error", function () {
        var postChain = createPostChain();
        assert.throws(function () { postChain.expectLocation("/dogs/5") }, /The argument must be a valid URL./);
    });
});
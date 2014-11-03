var assert = require('chai').assert;
var testResources = require('require-namespace').testResources;
var cacheForeverExpectation = testResources.require('cacheForeverExpectation');

describe("when passed a value with no max-age", function() {
    it("should throw an error", function() {
        var runExpectation = cacheForeverExpectationWrapper("public,")
        assert.throws(runExpectation, /The cache-control value \'public,\' should have contained a max-age./)
    });
});

describe("when passed a value with no location", function() {
    it("should throw an error", function() {
        var runExpectation = cacheForeverExpectationWrapper(",max-age=5000")
        assert.throws(runExpectation, /The cache-control value \',max-age=5000\' should have matched/)
    });
});

describe("when passed a value with a small max-age", function() {
    it("should throw an error", function() {
        var runExpectation = cacheForeverExpectationWrapper("max-age=500, public")
        assert.throws(runExpectation, /The cache-control max-age value of \'500\' should have been larger than \'315360000\'./)
    });
});

describe("when passed a value with a large enough max-age", function() {
    it("should not throw an error", function() {
        var runExpectation = cacheForeverExpectationWrapper("public, max-age=900000000")
        assert.doesNotThrow(runExpectation)
    });
});

describe("when passed a value with a large enough max-age and location is last", function() {
    it("should not throw an error", function() {
        var runExpectation = cacheForeverExpectationWrapper("max-age=900000000, public")
        assert.doesNotThrow(runExpectation)
    });
});

var cacheForeverExpectationWrapper = function cacheForeverExpectationWrapper(cacheControlHeader) {
    return function() { 
        var fakeResponse = { 
            headers: {
                'cache-control': cacheControlHeader
            }
        };

        cacheForeverExpectation("public", fakeResponse) 
    }
}
var assert = require('chai').assert,
    cacheForeverExpectation = lib.require('cacheForeverExpectation');

describe("when passed a value with no max-age", function() {

    it("should throw an error", function() {
        assert.throws(function() { cacheForeverExpectation })
    });
});
var assert = require('chai').assert;
var sinon = require('sinon');
var testresources = require('require-namespace').testresources;
var closeExpress = testresources.closeExpress;

describe("when closing express", function () {
    var stubExpress;

    beforeEach(function () {
        debugger;
        stubExpress = { close: function () { }, address: function () { } };
        stubExpress.close = sinon.spy(stubExpress, "close");
        closeExpress(stubExpress);
    });

    it("should close provided express instance", function () {
        debugger;
        assert.isTrue(stubExpress.close.calledOnce)
    });
});
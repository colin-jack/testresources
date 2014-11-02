var assert = require('chai').assert;
var sinon = require('sinon');
var proxyquire = require('proxyquire');

describe("when closing express", function () {
    var expressStub;
    var portManagerStub;

    beforeEach(function () {
        portManagerStub = { releasePort: function () { } };
        portManagerStub.releasePort = sinon.spy(portManagerStub, 'releasePort');
        var underTest = proxyquire('./../../lib/closeExpress', { './portManager': portManagerStub });

        expressStub = { close: function () { }, address: function () { } };
        expressStub.close = sinon.spy(expressStub, "close");
        underTest(expressStub);
    });

    it("should close provided express instance", function () {
        assert.isTrue(expressStub.close.calledOnce)
    });

    it("should release the port", function () {
        assert.isTrue(portManagerStub.releasePort.calledOnce)
    });
});
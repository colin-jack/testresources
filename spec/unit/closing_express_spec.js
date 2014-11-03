//var assert = require('chai').assert;
//var sinon = require('sinon');
//var testResources = require('./../namespace_with_test_doubles')
//debugger;
//var closeExpress = testResources.require('closeExpress');

//describe("when closing express", function () {
//    var expressStub;
//    var portManagerStub;

//    beforeEach(function () {
//        portManagerStub = { releasePort: function () { } };
//        portManagerStub.releasePort = sinon.spy(portManagerStub, 'releasePort');
        
//        debugger;
//        testResources.portManager = portManagerStub;

//        expressStub = { close: function () { }, address: function () { } };
//        expressStub.close = sinon.spy(expressStub, "close");
        
//        closeExpress(expressStub);

//        testResources.removeTestDoubles();
//    });

//    it("should close provided express instance", function () {
//        assert.isTrue(expressStub.close.calledOnce)
//    });

//    it("should release the port", function () {
//        assert.isTrue(portManagerStub.releasePort.calledOnce)
//    });
//});
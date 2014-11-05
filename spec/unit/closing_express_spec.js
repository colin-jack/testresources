//var assert = require('chai').assert;
//var sinon = require('sinon');
//var testResources = require('./../namespace_with_test_doubles')
//debugger;
//var expressServerCloser = testResources.require('expressServerCloser');

//describe("when closing express", function () {
//    var expressStub;
//    var portAllocatorStub;

//    beforeEach(function () {
//        portAllocatorStub = { releasePort: function () { } };
//        portAllocatorStub.releasePort = sinon.spy(portAllocatorStub, 'releasePort');
        
//        debugger;
//        testResources.portAllocator = portAllocatorStub;

//        expressStub = { close: function () { }, address: function () { } };
//        expressStub.close = sinon.spy(expressStub, "close");
        
//        expressServerCloser(expressStub);

//        testResources.removeTestDoubles();
//    });

//    it("should close provided express instance", function () {
//        assert.isTrue(expressStub.close.calledOnce)
//    });

//    it("should release the port", function () {
//        assert.isTrue(portAllocatorStub.releasePort.calledOnce)
//    });
//});
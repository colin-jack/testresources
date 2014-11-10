var fixture = require('./../testFixture');
var assert = fixture.assert;
var startTestServer = fixture.testResources.startTestServer;

describe("start test server - run test", function () {
    
    var underTest;

    beforeEach(function () {
        var fakeExpress = function () { };
        
        return startTestServer(fakeExpress).then(function (runningServer) {
            underTest = runningServer;
        });
    });

    describe("when you call run test but don't pass test definition", function () {
        it("should throw an error", function () {
            assert.throws(function () { underTest.runTest(null, null) }, "The test definition must be specified.")
        });
    });

    describe("when you call run test but pass invalid test definition", function () {
        it("should throw an error", function () {
            assert.throws(function () { underTest.runTest({}, null) }, "The test definition must have a runAgainst method. Please see documentation.")
        });
    });

    describe("when you call run test but pass invalid test definition", function () {
        it("should throw an error", function () {
            assert.throws(function () { underTest.runTest({}, null) }, "The test definition must have a runAgainst method. Please see documentation.")
        });
    });
})

describe("start test server - invalid arguments", function () {
    var InvalidExpressFunctionMessage = "You must specify the express app to use. This app must not yet be listening.";

    describe("when you do not provide the express instance to configure", function () {
        it("should throw an error", function () {
            assert.throws(function () { startTestServer(null) }, InvalidExpressFunctionMessage)
        });
    });

    describe("when you do provide an express instance which is not a function", function () {
        it("should throw an error", function () {
            assert.throws(function () { startTestServer({}) }, InvalidExpressFunctionMessage)
        });
    });

    describe("when you do provide an express instance which already has an address", function () {
        it("should throw an error", function () {
            var expressInstance = { address: function() { return {}}};
            assert.throws(function () { startTestServer(expressInstance) }, InvalidExpressFunctionMessage)
        });
    });
});
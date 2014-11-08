var fixture = require('./../testFixture');
var assert = fixture.assert;
var startServerFluent = fixture.testResources.startServerFluent;

describe("start server fluent interface", function () {
    
    var underTest;

    beforeEach(function () {
        var fakeExpress = {  };
        underTest = startServerFluent(fakeExpress);
    });
       
    describe("when you ask for a port but the server has not been started", function () {
        it("should throw an error", function () {
            assert.throws(function () { underTest.port }, "The port is not allocated until the server is started.")
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
    
    describe("when you do not provide the express instance to configure.", function () {
        it("should throw an error", function () {
            assert.throws(function () { startServerFluent(null) }, "You must specify the express app to use. This app must not yet be listening.")
        });
    });
})
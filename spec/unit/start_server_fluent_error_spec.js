var fixture = require('./../testFixture');
var assert = fixture.assert;
var startServerFluent = fixture.testResources.startServerFluent;

describe("when you ask for a port but the server has not been started", function () {
    it("should throw an error", function () {
        var fakeExpress = {};
        debugger;
        var underTest = startServerFluent(fakeExpress);
        assert.throws(function () { underTest.port }, "The port is not allocated until the server is started.")
    });
});
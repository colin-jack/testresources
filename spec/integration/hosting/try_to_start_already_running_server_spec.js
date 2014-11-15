var resourceTest = require('../../../index');
var fixture = require('../../testFixture')
var assert = fixture.assert;

var koa = require('koa');
var startServer = fixture.testResources.startTestServer;

describe('when start a test server then try to start it again', function() {
    var testServer;
    var request;
        
    before(function () {
        var app = koa();
        
        return startServer(app)
                        .then(function(runningServer) {
                            testServer = runningServer;
                        });
    })

    after(function () {
        testServer.close();
    })
        
    it('should raise an exception', function () {
        assert.throws(function () { startServer(testServer) }, "You must specify the koa app to use. This app must not yet be listening.")
    });
});

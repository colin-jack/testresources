var resourceTest = require('../../../index');
var fixture = require('../../testFixture')
var assert = fixture.assert;

var express = require('express');
var startServer = fixture.testResources.startTestServer;

describe('when start a test server then try to start it again', function() {
    var testServer;
    var request;
        
    before(function () {
        var app = express();
        
        return startServer(app)
                        .then(function(runningServer) {
                            testServer = runningServer;
                        });
    })

    after(function () {
        testServer.close();
    })
        
    it('should raise an exception', function () {
        assert.throws(function () { startServer(testServer) }, "You must specify the express app to use. This app must not yet be listening.")
    });
});

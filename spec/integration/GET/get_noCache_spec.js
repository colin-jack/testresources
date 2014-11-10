var resourceTest = require('../../../index');
var fixture = require('../../testFixture')
var assert = fixture.assert;

var express = require('express');
var superAgent = require('superagent');

var testUtil = require('./../testUtil');
var startServer = fixture.testResources.startTestServer;

describe('when you test a get request and resource returns json which is not cacheable', function() {
    var testServer;
    var request;
    
    before(function () {
        var app = express();
        
        app.get('/noCache', function (req, res) {
            res.header('Cache-Control', 'no-cache')
            res.send({ name: 'fido' });
        });
        
        return startServer(app).then(function (runningServer) {
            testServer = runningServer;
        });
    })
    
    beforeEach(function () {
        request = superAgent.get(testServer.fullUrl('/noCache'));
    });
    
    after(function () {
        testServer.close();
    })

    it('should pass if your expectations are correct', function() {
        return resourceTest(request)
                            .expectNotCached()
                            .run(testServer)
    });
    
    it('should fail if you expect caching cached', function () {
        return assert.isRejected(resourceTest(request)
                                                .expectCached("private", 10)
                                                .run(testServer), /The cache-control value/);
    });
})

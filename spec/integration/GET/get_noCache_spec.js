var resourceTest = require('../../../index');
var fixture = require('../../testFixture')
var assert = fixture.assert;

var express = require('express');
var superAgent = require('superagent');

var testUtil = require('./../testUtil');
var startServer = fixture.testResources.startServerFluent;

describe('when you test a get request and resource returns json which is not cacheable', function() {
    var server;
    var request;
    
    before(function () {
        var app = express();
        
        app.get('/noCache', function (req, res) {
            res.header('Cache-Control', 'no-cache')
            res.send({ name: 'fido' });
        });
        
        server = startServer(app);
    })
    
    beforeEach(function () {
        request = superAgent.get('/noCache');
    });
    
    after(function () {
        server.close();
    })

    it('should pass if your expectations are correct', function() {
        return resourceTest(request)
                            .expectNotCached()
                            .run(server)
    });
    
    it('should fail if you expect caching cached', function () {
        return assert.isRejected(resourceTest(request)
                                                .expectCached("private", 10)
                                                .run(server), /The cache-control value/);
    });
})

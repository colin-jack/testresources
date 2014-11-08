var resourceTest = require('../../../index');
var fixture = require('../../testFixture')
var assert = fixture.assert;

var express = require('express');
var superAgent = require('superagent');

var testUtil = require('./../testUtil');
var startServer = fixture.testResources.startServerFluent;

describe('when you test a get request and resource returns json which can be cached for twenty years publically', function () {
    var server;
    var request;
    
    before(function () {
        var app = express();
        
        app.get('/cacheForever', function (req, res) {
            var twentyYears = 20 * 365 * 24 * 60 * 60;
            res.header('Cache-Control', 'public, max-age=' + twentyYears)
            res.send({ name: 'fido' });
        });
        
        server = startServer(app);
    })
    
    beforeEach(function () {
        request = superAgent.get('/cacheForever');
    });
    
    after(function () {
        server.close();
    })
    
    it('should pass if your expectation matches', function () {
        return resourceTest(request)
                            .expectCachedForever('public')
                            .run(server)
    });
});
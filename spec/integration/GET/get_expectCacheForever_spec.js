var resourceTest = require('../../../index');
var fixture = require('../../testFixture')
var assert = fixture.assert;

var express = require('express');
var superAgent = require('superagent');

var testUtil = require('./../testUtil');
var startServer = fixture.testResources.startServerFluent;

describe('when you test a get request and resource returns json which can be cached for twenty years publically', function () {
    var testBuilder;
    
    beforeEach(function () {
        var app = express();
        
        app.get('/cacheForever', function (req, res) {
            var twentyYears = 20 * 365 * 24 * 60 * 60;
            res.header('Cache-Control', 'public, max-age=' + twentyYears)
            res.send({ name: 'fido' });
        });
        
        testBuilder = resource(app).get('/cacheForever');
    });
    
    it('should pass if your expectation matches', function (done) {
        testBuilder
            .expectCachedForever('public')
            .run(testUtil.assertNoError(done));
    });
});
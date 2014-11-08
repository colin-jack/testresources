var resourceTest = require('../../../index');
var fixture = require('../../testFixture')
var assert = fixture.assert;

var express = require('express');
var superAgent = require('superagent');

var testUtil = require('./../testUtil');
var startServer = fixture.testResources.startServerFluent;

describe('when you test a put request', function () {
    var server;
    var request;
    
    before(function () {
        var app = express();
        
        app.put('/baddogs', function (req, res) {
            res.status(400).end();
        });
        
        server = startServer(app);
    })
    
    beforeEach(function () {
        request = superAgent.put('/baddogs')
    });
    
    after(function (done) {
        server.close(done);
    })
    
    it('should pass if your expectations are correct', function () {
        return resourceTest(request).expectStatus(400).run(server)
    });
    
    it('should fail if the default 200 response status expection is applied', function () {
        return assert.isRejected(resourceTest(request).run(server), /The status should have been 200./);;
    });
});
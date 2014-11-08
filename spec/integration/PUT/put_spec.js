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
            
        app.put('/dogs', function (req, res) {
            res.send({ name: 'fido' });
        });
            
        server = startServer(app);
    })
        
    beforeEach(function () {
        request = superAgent.put('/dogs')
    });
        
    after(function (done) {
        server.close(done);
    })
        
    it('should pass if your expectations are correct', function () {
        return resourceTest(request)
                        .expectBody({ name: 'fido' })
                        .run(server)
    });

    
    it('should fail if body is incorrect', function () {
        return assert.isRejected(resourceTest(request)
                                                .expectBody({ name: "mike" })
                                                .run(server), /The body did not match./);
    });

    it('should fail if response code is not expected', function () {
        return assert.isRejected(resourceTest(request).expectStatus(400).run(server), "The status should have been 400.");
    }); 
});
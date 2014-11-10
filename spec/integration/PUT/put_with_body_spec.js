var resourceTest = require('../../../index');
var fixture = require('../../testFixture')
var assert = fixture.assert;

var express = require('express');
var superAgent = require('superagent');
var bodyparser = require('body-parser');

var startServer = fixture.testResources.startTestServer;

describe('when you test a put request', function () {
    var testServer, request;
        
    before(function () {
        var app = express();
        app.use(bodyparser.json());
            
        app.put('/dogs', function (req, res) {
            res.status(201).send(req.body);
        });
            
        return startServer(app).then(function (runningServer) {
            testServer = runningServer;
        });
    })
        
    beforeEach(function () {
        request = superAgent
                        .put(testServer.fullUrl('/dogs'))
                        .send({ name: 'fido' });
    });
        
    after(function (done) {
        testServer.close(done);
    })
        
    it('should pass if your expectations are correct', function () {
        return resourceTest(request)
                        .expectStatus(201)
                        .expectBody({ name: 'fido' })
                        .run(testServer)
    });
});
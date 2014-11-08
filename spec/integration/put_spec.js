var resourceTest = require('../../index');
var fixture = require('../testFixture')
var assert = fixture.assert;

var express = require('express');
var superAgent = require('superagent');

var testUtil = require('./testUtil');
var startServer = fixture.testResources.startServerFluent;

describe("put - ", function () {
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
        
        after(function () {
            server.close();
        })
        
        it('should pass if your expectations are correct', function (done) {
            resourceTest(request)
                            .expectBody({ name: 'fido' })
                            .run(server, done)
        });
    });
});
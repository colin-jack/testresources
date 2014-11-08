var resourceTest = require('../../../index');
var fixture = require('../../testFixture')
var assert = fixture.assert;

var express = require('express');
var superAgent = require('superagent');

var testUtil = require('./../testUtil');
var startServer = fixture.testResources.startServerFluent;

describe('when you test a get request', function() {
    describe('and resource returns cacheable json', function () {
        var server;
        var request;
            
        before(function () {
            var app = express();
                
            app.get('/get', function (req, res) {
                res.header('Cache-Control', 'private, max-age=300')
                res.send({ name: 'fido' });
            });
                
            server = startServer(app);
        })
            
        beforeEach(function () {
            request = superAgent.get('/get')
        });
            
        after(function () {
            server.close();
        })
            
        it('should pass if your expectations are correct', function () {
            return resourceTest(request)
                            .expectBody({ name: 'fido' })
                            .expectCached("private", 5)
                            .run(server)
        });
            
        it('should pass if your expectations are correct', function () {
            return resourceTest(request)
                            .expectBody({ name: 'fido' })
                            .expectCached("private", 5)
                            .run(server)
        });

        it('should pass if your expectations are correct2', function (done) {
            resourceTest(request)
                            .expectBody({ name: 'fido' })
                            .expectCached("private", 5)
                            .run(server, done)
        });

        it('should fail if caching expectation is incorrect', function () {
            return assert.isRejected(resourceTest(request)
                                                .expectCached("private", 10)
                                                .run(server));
        });

        it('should fail if body expectation is incorrect', function () {
            return assert.isRejected(resourceTest(request)
                                                .expectBody({ name: 'spot' })
                                                .run(server));
        }); 

        it('should fail if response code is not expected', function () {
            return assert.isRejected(resourceTest(request)
                                                .expectStatus(400)
                                                .run(server), /The status should have been 400./);
        });
            
        it.skip('should fail if you expect it to be cached forever', function () {
            debugger;
            var api = resourceTest(request).expectCachedForever();
            return assert.isRejected(api
                                                .run(server), /the body did not match/);
        });
            
        it.skip('should work if body is empty but we expected that', function () {
        });

        it.skip('should fail if you expect no caching but resource is cached', function () {
        });
    })

    describe('and resource returns something other than JSON', function () {
        it('should fail');
    });
});

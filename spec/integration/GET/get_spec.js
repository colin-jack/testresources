var resourceTest = require('../../../index');
var fixture = require('../../testFixture')
var assert = fixture.assert;

var express = require('express');
var superAgent = require('superagent');

var startServer = fixture.testResources.startTestServer;

describe('when you test a get request', function() {
    describe('and resource returns cacheable json', function () {
        var testServer;
        var request;
            
        before(function () {
            var app = express();
                
            app.get('/get', function (req, res) {
                res.header('Cache-Control', 'private, max-age=300')
                res.send({ name: 'fido' });
            });
               
            // we are using chai-as-promise and this method returns a promise so mocha
            // will wait for it to complete, you can instead use the mocha done approach
            // and pass the done method as last argument to startServer
            return startServer(app).then(function (runningServer) {
                testServer = runningServer;
            });
        })
            
        beforeEach(function () {
            request = superAgent.get(testServer.fullUrl('/get'));
        });
            
        after(function () {
            testServer.close();
        })
            
        it('should pass if your expectations are correct', function () {
            // this is also taken advantage of chai-as-promise because run returns a promise that
            // is completed when the test is finished
            return resourceTest(request)
                            .expectBody({ name: 'fido' })
                            .expectCached("private", 5)
                            .run(testServer)
        });

        it('should fail if caching expectation is incorrect', function () {
            return assert.isRejected(resourceTest(request)
                                                .expectCached("private", 10)
                                                .run(testServer));
        });

        it('should fail if body expectation is incorrect', function () {
            return assert.isRejected(resourceTest(request)
                                                .expectBody({ name: 'spot' })
                                                .run(testServer));
        }); 

        it('should fail if response code is not expected', function () {
            return assert.isRejected(resourceTest(request)
                                                .expectStatus(400)
                                                .run(testServer), /The status should have been 400./);
        });
            
        it('should fail if you expect it to be cached forever', function () {
            return assert.isRejected(resourceTest(request)
                                                .expectCachedForever("private")
                                                .run(testServer), /The cache-control max-age value of '300' should have been larger than '315360000'./);
        });

        it('should fail if you expect no caching but resource is cached', function () {
            return assert.isRejected(resourceTest(request)
                                                .expectNotCached()
                                                .run(testServer), 
                                    "The cache-control value \'private, max-age=300\' should have matched \'/(.*no-cache.*)/\'/");
        });
    })

    describe('and resource returns something other than JSON', function () {
        it('should fail');
    });

    describe(' and response body is empty', function () {
        it.skip('should work if body is empty but we expected that', function () { });
        it.skip('should fail if body is empty but we did not expect that', function () { });
    });
});

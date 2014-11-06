var resourceTest = require('../../../index');
var fixture = require('../../testFixture')
var assert = fixture.assert;

var express = require('express');
var superAgent = require('superagent');

var testUtil = require('./../testUtil');
var startServer = fixture.testResources.startServerFluent;

describe("get - ", function() {
    describe('when you test a get request', function() {
        describe('and resource returns cacheable json', function() {
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
            })
            
            after(function (done) {
                server.close(done);
            })

            it('should pass if your expectations are correct', function () {
                return resourceTest(request)
                                .expectBody({ name: 'fido' })
                                .expectCached("private", 5)
                                .run(server)
            });
            
            // TODO - Implement
            it('should work if body is empty but we expected that');

            it('should fail if caching expectation is incorrect', function () {
                return assert.isRejected(resourceTest(request)
                                                    .expectCached("private", 10)
                                                    .run(server));
                
            });

            //it('should fail if body expectation is incorrect', function(done) {
            //    testbuilder
            //       .expectbody({name: 'spot'})
            //       .run(testutil.asserterror(/the body did not match/, done));
            //}); 

            //it.skip('should fail if you expect it to be cached forever', function(done) {
            //    testbuilder
            //        .expectcachedforever()
            //        .run(testutil.asserterror(/the body did not match/, done));
            //});

            //it('should fail if response code is not expected', function(done) {
            //    testbuilder
            //        .expectstatus(400)
            //        .run(testutil.asserterror(/the status should have been 400./, done));
            //}); 

            it('should fail if you expect no caching but resource is cached'); 

        })

        describe('and resource returns something other than JSON', function () {
            this.pending = true;
            it('should fail');
        });
    });
});
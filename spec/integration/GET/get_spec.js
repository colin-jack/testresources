var testresources = require('require-namespace').testresources;
var resource = testresources.require('entryPointCreator');
var express = require('express');
var testUtil = require('./../testUtil');

describe("get - ", function() {
    describe('when you test a get request', function() {
        describe('and resource returns cacheable json', function() {
            var testBuilder;

            beforeEach(function() {
                var app = express();

                app.get('/get', function(req, res){
                    res.header('Cache-Control', 'private, max-age=300')
                    res.send({ name: 'fido' });
                });

                testBuilder = resource(app).get('/get');
            });

            it('should pass if your expectations are correct', function(done) {
                testBuilder
                    .expectBody({name: 'fido'})
                    .expectCached("private", 5)
                    .run(testUtil.assertNoError(done));
            });

            it('should work if body is empty but we expected that');

            it('should fail if caching expectation is incorrect', function(done) {
                testBuilder
                   .expectCached("private", 10)
                   .run(testUtil.assertError(/The cache-control value/, done));
            });

            it('should fail if body expectation is incorrect', function(done) {
                testBuilder
                   .expectBody({name: 'spot'})
                   .run(testUtil.assertError(/The body did not match/, done));
            }); 

            it.skip('should fail if you expect it to be cached forever', function(done) {
                testBuilder
                    .expectCachedForever()
                    .run(testUtil.assertError(/The body did not match/, done));
            });

            it('should fail if response code is not expected', function(done) {
                testBuilder
                    .expectStatus(400)
                    .run(testUtil.assertError(/The status should have been 400./, done));
            }); 

            it('should fail if you expect no caching but resource is cached'); 

        })

        describe('and resource returns something other than JSON', function() {
            it('should fail');
        });
    });
});
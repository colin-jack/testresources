var resource = lib.require('entryPointCreator'),
    resource = lib.require('entryPointCreator'),
    express = require('express'),
    testUtil = require('./testUtil');

describe('when you test a get request', function() {
    describe('and resource returns cacheable json', function() {
        var testBuilder;

        beforeEach(function() {
            var app = express();

            app.get('/puppy', function(req, res){
                res.header('Cache-Control', 'private, max-age=300')
                res.send({ name: 'fido' });
            });

            testBuilder = resource(app).get('/puppy');
        });

        it('should pass if your expectations are correct', function(done) {
            testBuilder
                .expectGot({name: 'fido'})
                .expectCached("private", 5)
                .run(testUtil.assertNoError(done));
        });

        it('should work if body is empty but we expected that');

        it('should fail if caching expectation is incorrect', function(done) {
            testBuilder
               .expectCached("private", 10)
               .run(testUtil.assertError(/The cache-control value/, done));
        });

        it('should fail if body expecation is incorrect', function(done) {
            testBuilder
               .expectGot({name: 'spot'})
               .run(testUtil.assertError(/The body looked like/, done));
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

    describe('and resource returns json which is not cacheable', function() {
        var testBuilder;

        beforeEach(function() {
            var app = express();

            app.get('/puppy', function(req, res){
                res.header('Cache-Control', 'no-cache')
                res.send({ name: 'fido' });
            });

            testBuilder = resource(app).get('/puppy');
        });

        it('should pass if your expectations are correct');

        it('should fail if you expect caching cached'); 

    })
});

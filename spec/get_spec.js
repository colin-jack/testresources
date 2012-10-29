var resource = lib.require('entryPointCreator'),
    express = require('express'),
    testUtil = require('./testUtil');

describe('when you get it to test a get request', function() {
    describe('and resource returns cacheable json', function() {
        var get;

        beforeEach(function() {
            var app = express();

            app.get('/puppy', function(req, res){
                res.header('Cache-Control', 'private, max-age=300')
                res.send({ name: 'fido' });
            });

            get = resource(app).get('/puppy');
        });

        it('should pass if your expectations are correct', function(done) {
            get.expectBody({name: 'fido'})
               .expectCached("private", 5)
               .end(testUtil.assertNoError(done));
        });

        it('should fail if caching expectation is incorrect', function(done) {
            get.expectCached("private", 10)
               .end(testUtil.assertError(done));
        });

        it('should fail if body expecation is incorrect', function(done) {
            get.expectBody({name: 'spot'})
               .end(testUtil.assertError(done)) 
        }); 

         it('should fail if response code is not expected', function(done) {
            get.expectStatus(400).end(testUtil.assertError(done)) 
        }); 
    })
});

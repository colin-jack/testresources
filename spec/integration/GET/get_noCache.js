var resource = testResourcesLib.require('entryPointCreator'),
    resource = testResourcesLib.require('entryPointCreator'),
    express = require('express'),
    testUtil = require('./../testUtil');

describe("get no cache - ", function() {
    describe('when you test a get request and resource returns json which is not cacheable', function() {
        var testBuilder;

        beforeEach(function() {
            var app = express();

            app.get('/noCache', function(req, res){
                res.header('Cache-Control', 'no-cache')
                res.send({ name: 'fido' });
            });

            testBuilder = resource(app).get('/noCache');
        });

        it('should pass if your expectations are correct', function(done) {
            debugger;
            testBuilder
                .expectNotCached()
                .run(testUtil.assertNoError(done));
        });

        it('should fail if you expect caching cached', function(done) {            
            testBuilder
               .expectCached("private", 10)
               .run(testUtil.assertError(/The cache-control value/, done));

        })
    })
});
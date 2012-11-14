var resource = lib.require('entryPointCreator'),
    resource = lib.require('entryPointCreator'),
    express = require('express'),
    testUtil = require('./../testUtil');

describe("get cache forever - ", function() {
    describe.skip('when you test a get request and resource returns json which can be cached forever', function() {
        var testBuilder;

        beforeEach(function() {
            var app = express();

            app.get('/noCache', function(req, res){
                // TOOD: Cache forever publically
                res.header('Cache-Control', 'no-cache')
                res.send({ name: 'fido' });
            });

            testBuilder = resource(app).get('/noCache');
        });

        it('should pass if your expectations are correct', function(done) {
            testBuilder
                .expectCacheForever('public')
                .run(testUtil.assertNoError(done));
        });
    })
});
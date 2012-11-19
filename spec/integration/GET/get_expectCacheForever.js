var resource = lib.require('entryPointCreator'),
    resource = lib.require('entryPointCreator'),
    express = require('express'),
    testUtil = require('./../testUtil');

describe("get cache forever - ", function() {
    describe('when you test a get request and resource returns json which can be cached for twenty years publically', function() {
        var testBuilder;

        beforeEach(function() {
            var app = express();

            app.get('/noCache', function(req, res){
                // TODO: Cache forever publically
                var twentyYears = 20 * 365 * 24 * 60 * 60;
                res.header('Cache-Control', 'public, max-age=' + twentyYears)
                res.send({ name: 'fido' });
            });

            testBuilder = resource(app).get('/noCache');
        });

        it('should pass if your expectation matches', function(done) {
            testBuilder
                .expectCachedForever('public')
                .run(testUtil.assertNoError(done));
        });
    })
});
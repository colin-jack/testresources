var resource = lib.require('entryPointCreator'),
    express = require('express'),
    testUtil = require('./testUtil');

describe('when you test a put request', function() {
    var testBuilder, app;

    beforeEach(function() {
        app = express();
    })

    describe("which returns success and valid body", function() {
        beforeEach(function() {
            app.put('/dogs', function(req, res){
                res.send({ name: "spot"});
            });

            testBuilder = resource(app).put('/dogs', { name: "fido"});
        });

        it('should pass when your expectations are correct', function(done) {
            testBuilder
                .expectBody({ name: "spot"})
                .run(testUtil.assertNoError(done));
        });

        it('should fail if body is incorrect', function(done) {
            testBuilder
                .expectBody({ name: "fido"})
                .run(testUtil.assertError(/The body looked like/, done));
        });

        it('should fail if response code is not expected', function(done) {
            testBuilder
                .expectStatus(400)
                .run(testUtil.assertError(/The status should have been 400./, done)) 
        }); 
    });
});

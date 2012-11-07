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

    describe("which fails with an error", function() {
        beforeEach(function() {
            app.put('/baddogs', function(req, res){
                res.send(400, {});
            });

            testBuilder = resource(app).put('/baddogs', { name: "fido"});
        });

        it('should fail for unexpected status', function(done) {
            testBuilder
                .run(testUtil.assertError(/The status should have been 200./, done)) ;
        });
    });

    describe("which returns something other than JSON", function() {
        beforeEach(function() {
            app.put('/baddogs', function(req, res){
                res.header["Content-Type"] = "text/html";
                res.send("<html></html>");
            });

            testBuilder = resource(app).put('/baddogs', { name: "fido"});
        });

        it.skip('should fail as JSON is default', function(done) {
            testBuilder
                .expectBody("<html></html>")
                .run(testUtil.assertError(/Expected JSON response./, done)) ;
        });

        it.skip('should pass if you have over-ridden expected content type', function(done) {
            testBuilder
                .expectBody("<html></html>")
                .expectContentType('text/html')
                .run(testUtil.assertNoError(done)) ;
        });
    });
});

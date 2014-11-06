var express = require('express');
var testUtil = require('./testUtil');
var superAgent = require('superagent');
var resourceTest = require('../../index');
var testResources = require('require-namespace').testResources;
var startServer = testResources.startServerFluent;

describe('when you test a put request', function() {
    describe("which returns success and valid body", function () {
        var testApi;
        var request;
        
        beforeEach(function (done) {
            var app = express();
            
            app.put('/dogs', function (req, res) {
                res.send({ name: "spot" });
            });
            
            testApi = startServer(app);
            
            request = superAgent
                              .put('/dogs')
                              .send({ name: "fido" });

            process.on('uncaughtException', function (err) {
                debugger;
                console.log(err);
            });

            var server = require('http').createServer(app).listen(80);
            debugger;
            setTimeout(done, 10000)
            
        })
        
        //after(function () {
        //    debugger;
        //    testApi.close();
        //})

        it('should pass when your expectations are correct', function (done) {
            var testDefinition = resourceTest(request).expectBody({ name: "spot" });
            testApi.runTest(testDefinition, done);
        });

        //it('should fail if body is incorrect', function(done) {
        //    assert.throws(function () {
        //        testApi.runTest(resourceTest(request).expectBody({ name: "fido" }));
        //    }, /The body did not match./);
        //});

        //it('should fail if response code is not expected', function (done) {
        //    assert.throws(function () {
        //        testApi.runTest(resourceTest(request).expectStatus(400));
        //    }, "The status should have been 400.");
        //}); 
    });

    //describe("which fails with an error", function() {
    //    beforeEach(function() {
    //        app.put('/baddogs', function(req, res){
    //            res.send(400, {});
    //        });

    //        testBuilder = resource(app).put('/baddogs', { name: "fido"});
    //    });

    //    it('should fail for unexpected status', function(done) {
    //        testBuilder
    //            .run(testUtil.assertError(/The status should have been 200./, done)) ;
    //    });
    //});

    //module.exports = describe("which returns something other than JSON", function () {
    //    beforeEach(function () {
    //        app.put('/baddogs', function (req, res) {
    //            res.header["Content-Type"] = "text/html";
    //            res.send("<html></html>");
    //        });
            
    //        testBuilder = resource(app).put('/baddogs', { name: "fido" });
    //    });
        
    //    it.skip('should fail as JSON is default', function (done) {
    //        testBuilder
    //            .expectBody("<html></html>")
    //            .run(testUtil.assertError(/Expected JSON response./, done));
    //    });
        
    //    it.skip('should pass if you have over-ridden expected content type', function (done) {
    //        testBuilder
    //            .expectBody("<html></html>")
    //            .expectContentType('text/html')
    //            .run(testUtil.assertNoError(done));
    //    });
    //})
});

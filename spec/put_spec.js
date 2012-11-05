var resource = lib.require('entryPointCreator'),
    express = require('express'),
    testUtil = require('./testUtil');

describe('when you test a put request', function() {
    var testBuilder;

    beforeEach(function() {
        var app = express();

        app.put('/puppy', function(req, res){
            res.status(200);
        });

        testBuilder = resource(app).put('/puppy', { name: "fido"});
    });

    it('should pass if your expectations are correct', function(done) {
        debugger;
        testBuilder.run(testUtil.assertNoError(done));
    });

    it('should fail if body is incorrect', function(done) {
        testBuilder
            .expectBody()
            .run(testUtil.assertError(/The body looked like/, done));
    });

    // it('should fail if body expecation is incorrect', function(done) {
    //     testBuilder.expectBody({name: 'spot'})
    //        .run(testUtil.assertError(done)) 
    // }); 

    //  it('should fail if response code is not expected', function(done) {
    //     testBuilder.expectStatus(400).run(testUtil.assertError(done)) 
    // }); 
});

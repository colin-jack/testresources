// var resource = lib.require('entryPointCreator'),
//     express = require('express'),
//     testUtil = require('./testUtil');

// describe('when you test a put request', function() {
//     var testBuilder;

//     beforeEach(function() {
//         var app = express();

//         app.put('/puppy', function(req, res){
//             res.status(200);
//         });

//         testBuilder = resource(app).put('/puppy', { name: "fido"});
//     });

//     it('should pass if your expectations are correct', function(done) {
//         debugger;
//         testBuilder.run(testUtil.assertNoError(done));
//     });

//     // it('should fail if caching expectation is incorrect', function(done) {
//     //     testBuilder.expectCached("private", 10)
//     //        .end(testUtil.assertError(done));
//     // });

//     // it('should fail if body expecation is incorrect', function(done) {
//     //     testBuilder.expectBody({name: 'spot'})
//     //        .end(testUtil.assertError(done)) 
//     // }); 

//     //  it('should fail if response code is not expected', function(done) {
//     //     testBuilder.expectStatus(400).end(testUtil.assertError(done)) 
//     // }); 
// });

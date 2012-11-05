// var resource = lib.require('entryPointCreator'),
//     express = require('express'),
//     testUtil = require('./testUtil');

// describe.only('when you test a put request', function() {
//     var testBuilder, app;

//     beforeEach(function() {
//         app = express();
//     })

//     describe("which returns success and valid body", function() {
//         beforeEach(function() {
//             app.put('/puppylove', function(req, res){
//                 debugger;
//                 console.log("*******************************");
//                 res.send({ name: "spot"});
//                 //res.status(900);
//             });

//             testBuilder = resource(app).put('/puppylove', { name: "fido"});
//         });

//         it('should pass when your expectations are correct', function(done) {
//             testBuilder
//                 .expectBody({ name: "spot"})
//                 .run(testUtil.assertNoError(done));
//         });

//         it('should fail if body is incorrect', function(done) {
//             testBuilder
//                 .expectBody({ name: "spot"})
//                 .run(testUtil.assertError(/The body looked like/, done));
//         });

//         it('should fail if response code is not expected', function(done) {
//             testBuilder
//                 .expectStatus(400)
//                 .run(testUtil.assertError(/The status should have been 400./, done)) 
//         }); 
//     });
// });

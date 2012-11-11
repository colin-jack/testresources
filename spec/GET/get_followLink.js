// var resource = lib.require('entryPointCreator'),
//     resource = lib.require('entryPointCreator'),
//     express = require('express'),
//     testUtil = require('./../testUtil');

// describe('when you test a get request', function() {
//     describe('and resource returns json which is not cacheable', function() {
//         var testBuilder;

//         beforeEach(function() {
//             var app = express();

//             app.get('/puppy', function(req, res){
//                 res.header('Cache-Control', 'no-cache')
//                 res.send({ name: 'fido' });
//             });

//             testBuilder = resource(app).get('/puppy');
//         });

//         it('should pass if your expectations are correct', function(done) {
//             testBuilder
//                 .expectNotCached()
//                 .followLink("address")
//                     .expectBody(...)
//                     //.expectCacheForever("publically")
//                     .endLink()
//                 .run(testUtil.assertNoError(done));
//         });
//     })
// });
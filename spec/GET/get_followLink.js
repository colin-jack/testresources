var resource = lib.require('entryPointCreator'),
    getServerAddress = lib.require('getServerAddress'),
    express = require('express'),
    testUtil = require('./../testUtil'),
    http = require('http');

describe("follow link - ", function() {
    describe.skip('when you test a get request containing a link', function() {
        var testBuilder, address, server;

        beforeEach(function() {
            var app = express()
            server = http.createServer(app);

            address = { postCode: "EH12 9YY" }

            app.get('/withLink', function(req, res){
                res.header('Cache-Control', 'no-cache');

                var addressHref = "/address"; // getServerAddress(server,

                res.json({ name: 'fido', address: addressHref});
            });

            app.get('/address', function(req, res) {
                res.header('Cache-Control', 'no-cache')

                res.json(address);
            });

            testBuilder = resource(app).get('/withLink');
        });

        it('should pass if your expectations are correct and you can follow the link', function(done) {
            testBuilder
                .expectNotCached()
                .followLink("address")
                     .expectBody(address)
                     .expectCacheForever("publically")
                     .endLink()
                .run(testUtil.assertNoError(done));
        });
    });
});
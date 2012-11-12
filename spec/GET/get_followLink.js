var resource = lib.require('entryPointCreator'),
    getServerAddress = lib.require('getServerAddress'),
    express = require('express'),
    testUtil = require('./../testUtil'),
    http = require('http');

describe('when you test a get request containing a link', function() {
    var testBuilder, address;

    beforeEach(function() {
        var app = express()
        var server = http.createServer(app);

        address = { postCode: "EH12 9YY" }

        app.get('/puppy', function(req, res){
            res.header('Cache-Control', 'no-cache');

            var addressHref = getServerAddress(server, "/address/5")

            res.json({ name: 'fido', address: addressHref});
        });

        app.get('/address/:id', function(req, res) {
            res.header('Cache-Control', 'no-cache')

            res.json(address);
        });

        testBuilder = resource(server).get('/puppy');
        // testBuilder = resource(server).get('/address/5');
    });

    it.only('should pass if your expectations are correct and you can follow the link', function(done) {
        testBuilder
            .expectNotCached()
            .followLink("address")
                .expectBody(address)
                //.expectCacheForever("publically")
                .endLink()
            .run(testUtil.assertNoError(done));
        // testBuilder.expectBody(address).run(testUtil.assertNoError(done));
    });
});
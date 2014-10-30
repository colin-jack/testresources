var testresources = require('require-namespace').testresources;
var resource = testresources.require('entryPointCreator');
var getServerAddress = testresources.require('getServerAddress');
var express = require('express');
var testUtil = require('./../testUtil');
var http = require('http');

describe("follow link - ", function() {
    describe('when you test a get request containing a link', function() {
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
                var twentyYears = 20 * 365 * 24 * 60 * 60;
                res.header('Cache-Control', 'public, max-age=' + twentyYears)

                res.json(address);
            });

            testBuilder = resource(app).get('/withLink');
        });

        it('should pass if your expectations are correct and you can follow the link', function(done) {
            testBuilder
                .expectNotCached()
                .followLink("address")
                     .expectBody(address)
                     .expectCachedForever("public")
                     .endLink()
                .run(testUtil.assertNoError(done));
        });
    });
});
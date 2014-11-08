var resourceTest = require('../../../index');
var fixture = require('../../testFixture')
var assert = fixture.assert;

var express = require('express');
var superAgent = require('superagent');

var testUtil = require('./../testUtil');
var startServer = fixture.testResources.startServerFluent;
var getServerAddress = fixture.testResources.getServerAddress;

describe('when you test a get request containing a link', function () {
    var server;
    var request;
    var address;

    before(function () {
        var app = express();
        
        address = { postCode: "EH12 9YY" }
        
        app.get('/withLink', function (req, res) {
            res.header('Cache-Control', 'no-cache');
            
            var addressesUrl = getServerAddress(server.server, "/address");
            
            res.send({ name: 'fido', address: addressesUrl });
        });
        
        app.get('/address', function (req, res) {
            var twentyYears = 20 * 365 * 24 * 60 * 60;
            res.header('Cache-Control', 'public, max-age=' + twentyYears)
                
            res.send(address);
        });
        
        server = startServer(app);
    })
    
    beforeEach(function () {
        request = superAgent.get('/withLink');
    });
    
    after(function () {
        server.close();
    })
    
    it('should pass if you specify correct assertions for a link in response', function () {
        return resourceTest(request)
                .followLink("address")
                     .expectBody(address)
                     .expectCachedForever("public")
                     .endLink()
                .run(server);
    });

    it.skip('should pass if you specify correct assertions for a relative URL link in response', function () {
        return resourceTest(request)
                .followLink("addressRelative")
                     .expectBody(address)
                     .expectCachedForever("public")
                     .endLink()
                .run(server);
    });
});
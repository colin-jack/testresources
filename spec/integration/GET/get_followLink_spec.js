var resourceTest = require('../../../index');
var fixture = require('./../integrationTestFixture')
var assert = fixture.assert;

var superAgent = require('superagent');

var startServer = fixture.testResources.startTestServer;

describe('when you test a get request containing a link', function () {
    var testServer;
    var request;
    var address;

    before(function () {
        var app = fixture.getKoaApp();
        
        address = { postCode: "EH12 9YY" }
        
        app.get('/withLink', function * () {
            this.response.set('Cache-Control', 'no-cache');
            
            //var addressesUrl = getServerAddress(testServer.server, "/address");
            var addressesUrl = testServer.fullUrl("/address");
            
            this.response.body = { name: 'fido', address: addressesUrl };
        });
        
        app.get('/address', function * () {
            var twentyYears = 20 * 365 * 24 * 60 * 60;
            this.response.set('Cache-Control', 'public, max-age=' + twentyYears)
                
            this.response.body = address;
        });
        
        return startServer(app).then(function (runningServer) {
                                        testServer = runningServer;
                                     });
    })
    
    beforeEach(function () {
        request = superAgent.get(testServer.fullUrl('/withLink'));
    });
    
    after(function () {
        testServer.close();
    })
    
    it('should pass if you specify correct assertions for a link in response', function () {
        debugger;
        return resourceTest(request)
                .followLink("address")
                     .expectBody(address)
                     .expectCachedForever("public")
                     .endLink()
                .run(testServer);
    });

    it.skip('should pass if you specify correct assertions for a relative URL link in response', function () {
        return resourceTest(request)
                .followLink("addressRelative")
                     .expectBody(address)
                     .expectCachedForever("public")
                     .endLink()
                .run(testServer);
    });
});
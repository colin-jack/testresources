var resourceTest = require('../../../index');
var fixture = require('./../integrationTestFixture')
var assert = fixture.assert;

var superAgent = require('superagent');

var startServer = fixture.testResources.startTestServer;

describe('when you test a get request and resource returns json which can be cached for twenty years publically', function () {
    var testServer;
    var request;
    
    before(function () {
        var app = fixture.getKoaApp();
        
        app.get('/cacheForever', function * (next) {
            var twentyYears = 20 * 365 * 24 * 60 * 60;
            this.response.set('Cache-Control', 'public, max-age=' + twentyYears)
            this.response.body = { name: 'fido' };
        });

        return startServer(app).then(function (runningServer) {
                                        testServer = runningServer;
                                     });
    })
    
    beforeEach(function () {
        request = superAgent.get(testServer.fullUrl('/cacheForever'));
    });
    
    after(function () {
        testServer.close();
    })
    
    it('should pass if your expectation matches', function () {
        return resourceTest(request)
                            .expectCachedForever('public')
                            .run(testServer)
    });
});
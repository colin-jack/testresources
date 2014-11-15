var resourceTest = require('../../../index');
var fixture = require('./../integrationTestFixture')
var assert = fixture.assert;

var koa = require('koa');
var superAgent = require('superagent');

var testUtil = require('./../testUtil');
var startServer = fixture.testResources.startTestServer;

describe('when you test a get request and resource returns json which is not cacheable', function() {
    var testServer;
    var request;
    
    before(function () {
        var app = fixture.getKoaApp();
        
        app.get('/noCache', function * () {
            this.response.set('Cache-Control', 'no-cache')
            this.response.body = { name: 'fido' };
        });
        
        return startServer(app).then(function (runningServer) {
            testServer = runningServer;
        });
    })
    
    beforeEach(function () {
        request = superAgent.get(testServer.fullUrl('/noCache'));
    });
    
    after(function () {
        testServer.close();
    })

    it('should pass if your expectations are correct', function() {
        return resourceTest(request)
                            .expectNotCached()
                            .run(testServer)
    });
    
    it('should fail if you expect caching cached', function () {
        return assert.isRejected(resourceTest(request)
                                                .expectCached("private", 10)
                                                .run(testServer), /The cache-control value/);
    });
})

describe.skip('when you test a get request and resource returns json but there is no caching header', function () {
    var testServer;
    var request;
    
    before(function () {
        var app = fixture.getKoaApp();
        
        app.get('/noCacheSet', function () {
            this.response.body = { name: 'fido' };
        });
        
        return startServer(app).then(function (runningServer) {
            testServer = runningServer;
        });
    })
    
    beforeEach(function () {
        request = superAgent.get(testServer.fullUrl('/noCacheSet'));
    });
    
    after(function () {
        testServer.close();
    })
    
    it('should pass if your expectations are correct', function () {
        return resourceTest(request)
                            .expectNotCached()
                            .run(testServer)
    });
    
    it('should fail if you expect caching cached', function () {
        return assert.isRejected(resourceTest(request)
                                                .expectCached("private", 10)
                                                .run(testServer), /The cache-control value/);
    });
})

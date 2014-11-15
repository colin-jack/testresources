var resourceTest = require('../../../index');
var fixture = require('./../integrationTestFixture')
var assert = fixture.assert;

var superAgent = require('superagent');

var startServer = fixture.testResources.startTestServer;

describe('when you test a put request', function () {
    var testServer, request;
        
    before(function () {
        var app = fixture.getKoaApp();
        
        app.put('/dogs', function * () {
            this.response.body = this.request.body;
            this.status = 201;
        });
            
        return startServer(app).then(function (runningServer) {
            testServer = runningServer;
        });
    })
        
    beforeEach(function () {
        request = superAgent
                        .put(testServer.fullUrl('/dogs'))
                        .send({ name: 'fido' });
    });
        
    after(function (done) {
        testServer.close(done);
    })
        
    it('should pass if your expectations are correct', function () {
        return resourceTest(request)
                        .expectStatus(201)
                        .expectBody({ name: 'fido' })
                        .run(testServer)
    });
});
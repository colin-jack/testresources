var resourceTest = require('../../../index');
var fixture = require('./../integrationTestFixture')
var assert = fixture.assert;

var superAgent = require('superagent');

var startServer = fixture.testResources.startTestServer;

describe('when you test a put request', function () {
    var server;
    var request;
        
    before(function () {
        var app = fixture.getKoaApp();
        
        app.put('/dogs', function * () {
            this.response.body = { name: 'fido' };
        });
            
        return startServer(app).then(function (runningServer) {
            server = runningServer;
        });
    })
        
    beforeEach(function () {
        request = superAgent.put(server.fullUrl('/dogs'));
    });
        
    after(function (done) {
        server.close(done);
    })
        
    it('should pass if your expectations are correct', function () {
        return resourceTest(request)
                        .expectBody({ name: 'fido' })
                        .run(server)
    });
    
    it('should fail if body is incorrect', function () {
        return assert.isRejected(
                    resourceTest(request).expectBody({ name: "mike" }).run(server), 
                    /The body did not match./);
    });

    it('should fail if response code is not expected', function () {
        return assert.isRejected(
                        resourceTest(request).expectStatus(400).run(server), 
                        "The status should have been 400.");
    }); 
});
var resourceTest = require('../../../index');
var fixture = require('./../integrationTestFixture')
var assert = fixture.assert;

var superAgent = require('superagent');

var startServer = fixture.testResources.startTestServer;

describe('when you test a post request', function () {
    var server;
    var request;
        
    before(function () {
        var app = fixture.getKoaApp();
            
        app.post('/doghome', function * () {
            this.response.body = this.request.body;
            this.response.status = 201;
        });
            
        return startServer(app).then(function (runningServer) {
            server = runningServer;
        });
    })
        
    beforeEach(function () {
        request = superAgent
                            .post(server.fullUrl('/doghome'))
                            .send({ name: 'fido' });
    });
        
    after(function () {
        server.close();
    })
        
    it('should pass if your expectations are correct', function () {
        return resourceTest(request)
                        .expectStatus(201)
                        .expectBody({ name: 'fido' })
                        .run(server)
    });

    
    it('should fail if body is incorrect', function () {
        return assert.isRejected(
                    resourceTest(request).expectBody({ name: "mike" }).run(server), 
                    "The body did not match.");
    });

    it('should fail if response code is not expected', function () {
        return assert.isRejected(resourceTest(request).expectStatus(200).run(server), 
                    "The status should have been 200.");
    }); 
});
var resourceTest = require('../../../index');
var fixture = require('./../integrationTestFixture')
var assert = fixture.assert;

var superAgent = require('superagent');

var startServer = fixture.testResources.startTestServer;

describe('when you test a put request that returns a 400 response', function () {
    var server;
    var request;
    
    before(function () {
        var app = fixture.getKoaApp();
        
        app.put('/baddogs', function * () {
            this.response.status = 400;
        });

        return startServer(app).then(function (runningServer) {
            server = runningServer;
        });
    })
    
    beforeEach(function () {
        request = superAgent
                        .put(server.fullUrl('/baddogs'))
                        .send({ name: "fido" });
    });
    
    after(function (done) {
        server.close(done);
    })
    
    it('should pass if your expectations are correct', function () {
        return resourceTest(request).expectStatus(400).run(server)
    });
    
    it('should fail if the default 200 response status expection is applied', function () {
        return assert.isRejected(resourceTest(request).run(server), /The status should have been 200./);;
    });
});
# test resources
[![Build Status](https://travis-ci.org/colin-jack/testresources.svg?branch=master)](https://travis-ci.org/colin-jack/testresources)

Designed to be used with [superagent](https://github.com/visionmedia/superagent), makes it easy to write simple assertions about HTTP responses:

```js
describe('when you test a put request', function () {
    var testServer, request;
        
    before(function () {
        var app = express();
        app.use(bodyparser.json());
            
        app.put('/dogs', function (req, res) {
            res.status(201).send(req.body); // echoing back request body
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
```
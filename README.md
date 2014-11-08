# test resources
[![Build Status](https://travis-ci.org/colin-jack/testResources.png)](https://travis-ci.org/#!/colin-jack/testResources)

Designed to be used with [superagent](https://github.com/visionmedia/superagent), makes it easy to write simple assertions about HTTP responses:

```js
describe('when you test a get request', function() {
        describe('and resource returns cacheable json', function () {
            var server;
            var request;
            
            before(function () {
                var app = express();
                
                app.get('/get', function (req, res) {
                    res.header('Cache-Control', 'private, max-age=300')
                    res.send({ name: 'fido' });
                });
                
                server = startServer(app);

                request = superAgent.get('/get')
            })
            
            after(function (done) {
                server.close(done);
            })
            
            it('should pass if your expectations are correct', function () {
                return resourceTest(request)
                                .expectBody({ name: 'fido' })
                                .expectCached("private", 5)
                                .run(server)
            });
    })
})
```
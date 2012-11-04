var superagent = require('superagent'),
    Request = superagent.Request,
    http = require('http'),
    https = require('https');

//var expectStatusAndBody= function(expectedStatus, expectedBody)

var port = 3458;


var createGetChain = function(wrapper) {
    var expectations = [];

    return {
        expectGot: function(body) {
            expectations.push(function(response) {
                assert.deepEqual(response.body, body, "The body of the response was not what was expected.")
                assert.equal(response.status, 200)
                assert.deepEqual(response.headers["Content-Type"], /json/, "The body of the response should have been JSON.")
            });

            return this;
        },
        assert : function(allDone) {
            var that = this;
            var end = Request.prototype.end;

            debugger;
            end.call(wrapper, function(response) {
                debugger;
                that.expectations.forEach(function(expectation) {
                    expectation(response);
                })

                allDone();
            });            
        }
        // expectStatus : function(statusCode) {
        //     expectStatus(statusCode);
        //     return this;
        // },
        // expectCached: function(where, minutes) {
        //     var maxAge = "max-age=" + (minutes * 60);
        //     var regexString = "(.*" + maxAge + ".*" + where +".*)|(.*" + where + ".*" + maxAge + ".*)";
            
        //     expect('Cache-Control', new RegExp(regexString));

        //     return this;
        // },
    };
};
var RequestWrapper = function(expressApp, method, path) {
    url = this.serverAddress(expressApp, path);
    Request.call(this, method, url);
}

RequestWrapper.prototype.serverAddress = function(app, path){
  var addr = app.address();
  var portno = addr ? addr.port : port++;
  if (!addr) app.listen(portno);
  var protocol = app instanceof https.Server ? 'https' : 'http';
  return protocol + '://127.0.0.1:' + portno + path;
};

RequestWrapper.prototype.redirects = function() {
}

RequestWrapper.prototype.__proto__ = Request.prototype;

module.exports = function(expressApp) {
    expressApp = http.createServer(expressApp);
    return {
        get: function(relativeUrl) {
            debugger;
            
            var wrapper = new RequestWrapper(expressApp, "get", relativeUrl);
            return createGetChain(wrapper);
        },
        // put: function(url, body) {
        //     debugger;
        //     var callChain = wrappedSuperTest.put(url, body);//.expect('Content-Type', /json/);
        //     return createChainable(callChain);  
        // }
    };
};

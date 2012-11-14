var superagent = require('superagent'),
    Request = superagent.Request,
    getServerAddress = require('./getServerAddress'),
    format = require('util').format,
    closeExpress = require('./closeExpress');

var RequestWrapper = function(expressApp, method, path) {
    this.expressApp = expressApp;

    this.url = path.indexOf("http") !== -1 ? path : getServerAddress(expressApp, path);

    winston.info("About to request: " + this.url)

    Request.call(this, method, this.url);
}

RequestWrapper.prototype.onEnd = function(toCall) {
    var end = Request.prototype.end,
        that = this;

    var handleError = function handleError(err) {
        if (err) {
            winston.error(format("Request for url '%s' failed due to error '%s'.", that.url, err))
            toCall(err);
        }   
    }

    this.on('error', function(err) {
        debugger;
        that.removeAllListeners('error');
        handleError(err);
    });

    end.call(this, function(response) {  
        winston.info("Got response for " + response.req.path);

        toCall(null, response);
    }); 
}

RequestWrapper.prototype.closeExpress = function() {
    closeExpress(this.expressApp);
}

RequestWrapper.prototype.redirects = function() {
}

RequestWrapper.prototype.__proto__ = Request.prototype;

module.exports = RequestWrapper;
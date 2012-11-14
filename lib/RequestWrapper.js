var superagent = require('superagent'),
    Request = superagent.Request,
    getServerAddress = require('./getServerAddress'),
    format = require('util').format;

var RequestWrapper = function(expressApp, method, path) {
    this.expressApp = expressApp;

    this.url = path.indexOf("http") !== -1 ? path : this.serverAddress(expressApp, path);

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
        toCall(null, response);
    }); 
}

RequestWrapper.prototype.closeExpress = function() {
    try {
        debugger;
        // TODO: Likely to be because another request in the chain has already closed it.
        if (this.expressApp === undefined) {
            winston.info("expressApp was undefined")
            return;
        }

        var port = this.expressApp.address().port;

        this.expressApp.close();  
        winston.info("Express closed for port: " + port)
        this.expressApp = undefined;
    }
    catch (e) {
        winston.error("**** ERROR - Failed to close express due to : " + e)
        this.expressApp = undefined;
    }
}

RequestWrapper.prototype.serverAddress = function(app, path) {
    return getServerAddress(app, path);
};

RequestWrapper.prototype.redirects = function() {
}

RequestWrapper.prototype.__proto__ = Request.prototype;

module.exports = RequestWrapper;
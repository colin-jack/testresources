var superagent = require('superagent'),
    Request = superagent.Request,
    getServerAddress = require('./getServerAddress');

var RequestWrapper = function(expressApp, method, path) {
    this.expressApp = expressApp;

    var url = this.serverAddress(expressApp, path);

    Request.call(this, method, url);
}

RequestWrapper.prototype.closeExpress = function() {
    try {
        this.expressApp.close();  
    }
    catch (e) {
        require('util').log("**** ERROR - Failed to close express due to : " + e)
        return;
    }
}

RequestWrapper.prototype.onEnd = function(toCall) {
    var end = Request.prototype.end;
    var that = this;

    end.call(this, function(response) {
        that.closeExpress();

        toCall(response);
    }); 
}

RequestWrapper.prototype.serverAddress = function(app, path) {
    return getServerAddress(app, path);
};

RequestWrapper.prototype.redirects = function() {
}

RequestWrapper.prototype.__proto__ = Request.prototype;

module.exports = RequestWrapper;
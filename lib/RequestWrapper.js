var superagent = require('superagent'),
    Request = superagent.Request,
    getServerAddress = require('./getServerAddress');

var RequestWrapper = function(expressApp, method, path) {
    debugger;
    this.expressApp = expressApp;

    var url = path.indexOf("http") !== -1 ? path : this.serverAddress(expressApp, path);

    //console.log("About to request: " + url)

    Request.call(this, method, url);
}

RequestWrapper.prototype.onEnd = function(toCall) {
    var end = Request.prototype.end;

    this.on('error', function(err) {
        if (err) {
            winston.error("Request failed due to error: " + err)
            toCall(err);
        }    
    });

    end.call(this, function(response) {    
        toCall(null, response);
    }); 
}

RequestWrapper.prototype.closeExpress = function() {
    // try {
    //     debugger;
    //     this.expressApp.close();  
    // }
    // catch (e) {
    //     debugger;
    //     winston.error("**** ERROR - Failed to close express due to : " + e)
    //     this.expressApp = undefined;
    //     return;
    // }
}

RequestWrapper.prototype.serverAddress = function(app, path) {
    return getServerAddress(app, path);
};

RequestWrapper.prototype.redirects = function() {
}

RequestWrapper.prototype.__proto__ = Request.prototype;

module.exports = RequestWrapper;
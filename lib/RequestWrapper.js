var superagent = require('superagent'),
    Request = superagent.Request,
    http = require('http'),
    https = require('https');

var port = 3569;

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

// NOTE - Taken from supertest as it does exactly what I need.
RequestWrapper.prototype.serverAddress = function(app, path) {
    var addr = app.address();
    var portno;
    
    if (addr)
    {
        portno = addr.port;
    }
    else
    {
        port = port + 1;
        portno = port;
    }  

    if (!addr) app.listen(portno);
    var protocol = app instanceof https.Server ? 'https' : 'http';
    return protocol + '://127.0.0.1:' + portno + path;
};

RequestWrapper.prototype.redirects = function() {
}

RequestWrapper.prototype.__proto__ = Request.prototype;

module.exports = RequestWrapper;
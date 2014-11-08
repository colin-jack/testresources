var portAllocator = require('./portAllocator');
var startExpressServer = require('./startExpressServer');
var expressServerCloser = require('./closeExpressServer');
var winston = require('winston');
var Q = require('q');

// NOTE - This is to support the following API:
//	startServer(express).andRunTest(testDefinition()..., done);

var validateExpressApp = function (expressApp) {
	// TODO: Check if its already running
	// TODO: Check if it has listen and address methods that we need
}

var ensureServerRunning = function * () {
    if (this.server) return;
    
    var freePort = yield * portAllocator.allocatePort();
    
    this.server = startExpressServer(this.expressApp, freePort);
}

var runTest = function (testDefinition, done) {
    if (!testDefinition) throw new Error("The test definition must be specified.");
    if (!testDefinition.runAgainst) throw new Error("The test definition must have a runAgainst method. Please see documentation.");

    var self = this;
    var deferred = Q.defer();
    
    Q.spawn(function *() {
        var exception;
        
        try {
            yield * self.ensureServerRunning();
            
            yield * testDefinition.runAgainst(self.server);
            
            deferred.resolve();
        } catch (e) {
            exception = e;
            
            winston.error("Error during test: " + e);
            
            deferred.reject(e);
        }
        
        if (done) {
            done(exception, null);
        }
    });
    
    return deferred.promise;
}

var close = function (done) {
    if (!this.server) return;
    
    var self = this;
    
    Q.spawn(function *() {
        yield expressServerCloser(self.server);
        
        winston.info("Server closed.");
        
        if (done) {
            done();
        }
    });
}

var addPortProperty = function (addTo) {
    Object.defineProperty(addTo, "port", {
        get: function () {
            if (!this.server || !this.server.address) throw new Error("The port is not allocated until the server is started.")
            
            return this.server.address().port;
        }
    });
}

var prototype = {
    // This will start the server if required then run the test
    runTest: runTest, 
    
    close: close,
    
    // You can explicitly call this to setup the server, if it is not called then
    // the server will be setup when runTest is called.
    ensureServerRunning: ensureServerRunning
}

var startServerFluent = function (expressApp) {
    validateExpressApp(expressApp);
    
    var instance = Object.create(prototype);
    
    addPortProperty(instance);
    
    instance.expressApp = expressApp;
    
    return instance;
}

module.exports = startServerFluent;
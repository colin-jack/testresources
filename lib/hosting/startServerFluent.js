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

var performTest = function * (testDefinition) {
    yield * this.ensureServerRunning();
    
    yield * testDefinition.runAgainst(this.server);
};

var runTest = function (testDefinition, done) {
    var self = this;
    var deferred = Q.defer();
    
    Q.spawn(function *() {
        var exception;
        
        try {
            yield * self.performTest(testDefinition);
            
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

var proto = {
    runTest: runTest, 
    
    performTest: performTest, 
    close: close,
    
    ensureServerRunning: ensureServerRunning
}

var startServerFluent = function (expressApp) {
    validateExpressApp(expressApp);
    
    var instance = Object.create(proto);
    
    Object.defineProperty(instance, "port", {
        get: function () {
            // TODO: Test this.
            if (!this.server || !this.server.address) throw new Error("The port is not allocated until the server is started.")
            
            return this.server.address().port;
        }
    });
    
    instance.expressApp = expressApp;
    
    return instance;
}

module.exports = startServerFluent;
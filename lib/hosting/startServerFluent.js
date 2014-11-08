var portAllocator = require('./portAllocator');
var startExpressServer = require('./startExpressServer');
var expressServerCloser = require('./closeExpressServer');
var winston = require('winston');
var Q = require('q');

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
    
    Q.spawn(function * () {
        yield * expressServerCloser(self);
        
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
    if (!expressApp) throw new Error("You must specify the express app to use. This app must not yet be listening.");
    
    var instance = Object.create(prototype);
    
    addPortProperty(instance);
    
    instance.expressApp = expressApp;
    
    return instance;
}

module.exports = startServerFluent;
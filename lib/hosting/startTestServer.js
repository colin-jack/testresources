var winston = require('winston');
var Q = require('q');

var testResources = require('require-namespace').testResources;
var getServerAddress = testResources.getServerAddress;
var portAllocator = testResources.portAllocator;
var startKoaServer = testResources.startKoaServer;
var expressServerCloser = testResources.closeExpressServer;

var startServerListening = function * (app) {    
    var freePort = yield * portAllocator.allocatePort();
    
    return startKoaServer(app, freePort);
}

var runTest = function (testDefinition, done) {
    if (!testDefinition) throw new Error("The test definition must be specified.");
    if (!testDefinition.runAgainst) throw new Error("The test definition must have a runAgainst method. Please see documentation.");

    var self = this;
    var deferred = Q.defer();
    
    Q.spawn(function *() {
        var exception;
        
        try {            
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

var fullUrl = function(partialUrl) {
    // TODO: Blow up if passed full URL
    return getServerAddress(this.server, partialUrl);
}

var prototype = {
    // This will start the server if required then run the test
    runTest: runTest,

    fullUrl: fullUrl,
    
    close: close
}

var validateapp = function(app) {
    if (!app || typeof app !== 'object' || typeof app.use !== 'function') {
        throw new Error("You must specify the koa app to use. This app must not yet be listening.");
    }
}

// Starts the express app listening, returning a promise that will be completed when the express app
// is up and ready, optinally you can pass in a done method if you prefer that approach
var startServer = function (app, done) {
    validateapp(app);
  
    var deferred = Q.defer();

    Q.spawn(function * () {
        var exception, instance;
        
        try {
            var runningServer = yield * startServerListening(app);
            
            instance = Object.create(prototype);

            instance.server = runningServer;
        
            addPortProperty(instance);
            
            deferred.resolve(instance);
        } catch (e) {
            exception = e;
            
            winston.error("Error during server startup: " + e);
            
            deferred.reject(e);
        }
        
        if (done) {
            if (exception) {
                done(exception, null);
            } else {
                done(null, instance)
            }
        }        
    });
  
    return deferred.promise;
}

module.exports = startServer;
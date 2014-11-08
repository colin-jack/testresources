var portAllocator = require('./portAllocator');
var startExpressServer = require('./startExpressServer');
var expressServerCloser = require('./closeExpressServer');
var Q = require('q');

// NOTE - This is to support the following API:
//	startServer(express).andRunTest(testDefinition()..., done);

var validateExpressApp = function (expressApp) {
	// TODO: Check if its already running
	// TODO: Check if it has listen and address methods that we need
}

var ensureServerRunning = function * (expressApp) {
    var freePort = yield * portAllocator.allocatePort();
    
    return startExpressServer(expressApp, freePort)
}

var performTest = function * (expressApp, testDefinition) {
    if (!this.server) {
        this.server = yield * ensureServerRunning(expressApp);
    }
    
    yield * testDefinition.runAgainst(this.server);
};

// TODO - Move to diff file
var runTestAndClose = function (testDefinition, done) {
    var self = this;
    var deferred = Q.defer();

    Q.spawn(function *() {
        var exception;
        
        try {
            yield * self.performTest(self.expressApp, testDefinition);

            deferred.resolve();
        } catch (e) {
            exception = e;

            deferred.reject(e);
        } finally {
            if (this.server) {
                yield expressServerCloser.close(self.server);
            }
        }
        
        if (done) {
            done(exception, null);
        }
    });

    return deferred.promise;
}

// TODO - Move to diff file
var runTest = function (testDefinition, done) {
    var self = this;
    var deferred = Q.defer();

    Q.spawn(function *() {
        var exception;
        
        try {
            yield * self.performTest(self.expressApp, testDefinition);
            
            deferred.resolve();
        } catch (e) {
            exception = e;

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
    });
}

var proto = {
    runTest: runTest, 
    
    performTest: performTest, 
    close: close,
    
    runTestAndClose: runTestAndClose
}

var startServerFluent = function (expressApp) {
    validateExpressApp(expressApp);
    
    var instance = Object.create(proto);
    
    instance.expressApp = expressApp;

    return instance;
}

module.exports = startServerFluent;
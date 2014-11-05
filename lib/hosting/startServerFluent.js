var portAllocator = require('./portAllocator');
var startExpressServer = require('./startExpressServer');
var expressServerCloser = require('./closeExpressServer');

// NOTE - This is to support the following API:
//	startServer(express).andRunTest(testDefinition()..., done);

var validateExpressApp = function(expressApp) {
	// TODO: Check if its already running
	// TODO: Check if it has listen and address methods that we need
}

var performTest = function(expressApp, testDefinition, done) {
	Q.spawn(function * () {
		var server;

		try
		{
			var currentPort = yield portAllocator.allocatePort(addr); 

			server = startExpressServer(expressApp, currentPort)

			yield testDefinition.runAgainst(server);

			if (done) {
				done(null, null)
			}
		}
		catch (e) {
			if (done) {
				done(e, null)
			}
		}
		finally {
			if (server) {
				yield * closeExpressServer(server);
			}
		}
	});
};

var startServerFluent = function(expressApp) {
	validateExpressApp(expressApp);

	return { 
		andRunTest: function(testDefinition, done) {
			performTest(expressApp, testDefinition, done);
		}
	}
}

module.exports = startServerFluent;
var Q = require('q');
var winston = require('winston');

// make the request, getting back a promise that is fulfilled when the request completes
var makeRequest = function (server, superAgentRequest) {    
    winston.info("About to make request for %s.", superAgentRequest.url)

    var promiseReturning = Q.denodeify(superAgentRequest.end.bind(superAgentRequest));
    return promiseReturning();
}

module.exports = makeRequest;
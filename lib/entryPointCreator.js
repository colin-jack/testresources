var assert = require('chai').assert;
var winston = require('winston');
var format = require('util').format;
var http = require('http');
var testResources = require('./namespace.js');
var createGetChain = testResources.createGetChain;
var createPutChain = testResources.createPutChain;
var Q = require('q');


var create = function (sendRequest) {
    return {
        sendRequest: function(superAgentRequest) {
            var chainToReturn = null;

            switch (superAgentRequest.method.toUpperCase) {
                case "GET":
                    chainToReturn = createGetChain();
                    break;
                case "PUT":
                    chainToReturn = createPutChain(); 
                    break;
                case "POST":
                    throw new Error("NYI");
                    break;
            }

            chainToReturn.superAgentRequest = superAgentRequest;

            return chainToReturn;
        }
    }
}

module.exports = {
    create: create
}
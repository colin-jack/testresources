var isValidUrl = require('valid-url').isHttpUri;
var sharedFluentInterface = require('./sharedFluentInterface');

var testResources = require('./../namespace');
var locationExpectation = testResources.locationExpectation;

var ensure = require('rules').ensure;

var expectLocation = function (location) {
    ensure(location, "location").populated().string();
    
    if (!isValidUrl(location)) throw new Error("The argument must be a valid URL.");

    this.expectations.location = function (response) {
        locationExpectation(response, location);
    }
    
    return this;
}

var createPostChain = function() {
    var postChain = Object.create(sharedFluentInterface);

    postChain.expectations = {};
    
    postChain.expectStatus(200);
    postChain.expectLocation = expectLocation;

    return postChain;
}

module.exports = createPostChain;
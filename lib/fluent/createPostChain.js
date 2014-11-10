var sharedFluentInterface = require('./sharedFluentInterface');

var createPostChain = function() {
    var postChain = Object.create(sharedFluentInterface);

    postChain.expectations = {};
    
    postChain.expectStatus(200);

    return postChain;
}

module.exports = createPostChain;
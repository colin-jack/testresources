var chai = require('chai');
chai.use(require('chai-as-promised'));

module.exports = {
    assert: chai.assert,
    testResources: require('./../lib/namespace')
}



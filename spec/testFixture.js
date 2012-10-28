global.assert = require('chai').assert;

require('longjohn')

var libNamespace = require('./../lib/namespace');
global.lib = libNamespace;
module.exports = libNamespace;

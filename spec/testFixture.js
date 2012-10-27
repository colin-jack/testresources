var libNamespace;

require('longjohn');

libNamespace = require('./../lib/namespace');

global.lib = libNamespace;

module.exports = libNamespace;

global.assert = require('chai').assert;

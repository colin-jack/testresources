global.assert = require('chai').assert;

// Reduce coupling to the directory structur under lib so tests don't break if I move files, and less need for ../../../ style
// pahts in require
var libNamespace = require('./../lib/namespace');
global.lib = libNamespace;
module.exports = libNamespace;

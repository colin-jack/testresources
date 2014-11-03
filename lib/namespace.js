// Brings all the files inside this directory into a namespace called 'lib', allowing you
// to require using testResources.require('{fileName}') without having to worry about the directory
// structure involved.
debugger;
var requireNamespace = require('require-namespace');
module.exports = requireNamespace.createSync(__dirname, "testResources");
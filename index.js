var entryPointCreator = require('./lib/entryPointCreator');
var supertest = require('supertest')

module.exports = function(express)  {
  var wrapped = supertest(express);

  return entryPointCreator(wrapped);
}
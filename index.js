// pass that into entryPoint
var supertest = require('supertest')
var entryPointCreator = require('./lib/entryPointCreator')

module.exports = entryPointCreator(supertest);
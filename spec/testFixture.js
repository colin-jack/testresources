//require('longjohn')

// Reduce coupling to the directory structure under lib so tests don't
// break if I move files, and less need for ../../../ style paths in require
global.testResourcesLib = require('./../lib/namespace');

global.assert = require('chai').assert;

var winston = require('winston');
winston.cli();
winston.info("Switching to only logging errors (testFixture.js).")
winston.level = 'error';



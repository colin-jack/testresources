var Mocha = require('mocha'),
    fs = require('fs'),
    path = require('path');

// First, you need to instantiate a Mocha instance.
var mocha = new Mocha({
    timeout: 60000
})

// Then, you need to use the method "addFile" on the mocha
// object for each file.

var testDirectory = __dirname + "/PUT/";

// Here is an example:
fs.readdirSync(testDirectory).filter(function (file) {
    // Only keep the .js files
    return file.indexOf("put_400_response_spec") != -1 &&
           file.substr(-3) === '.js';

}).forEach(function (file) {
    // Use the method "addFile" to add the file to mocha
    mocha.addFile(path.join(testDirectory, file)
);
});

// Now, you can run the tests.
mocha.run(function (failures) {
    process.on('exit', function () {
        process.exit(failures);
    });
});
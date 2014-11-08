var resourceTest = require('../../../index');
var fixture = require('../../testFixture')
var assert = fixture.assert;

var express = require('express');

var testUtil = require('./../testUtil');
var startServer = fixture.testResources.startServerFluent;
var closeExpressServer = fixture.testResources.closeExpressServer;

var Q = require('q');

describe('when given a listening express server', function () {
    var serverWrapper, expressServer;

    before(function (done) {
        var app = express();

        serverWrapper = startServer(app);

        Q.spawn(function * () {
            yield * serverWrapper.ensureServerRunning();

            expressServer = serverWrapper.server;

            yield * closeExpressServer(serverWrapper);

            done();
        });
    })

    it('should close correctly', function () {
        debugger;
        assert.isNull(expressServer.address());
    });

    it('should unsert server', function () {
        debugger;
        assert.isUndefined(expressServer.server);
    });
});

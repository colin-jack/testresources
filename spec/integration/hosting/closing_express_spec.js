var resourceTest = require('../../../index');
var fixture = require('../../testFixture')
var assert = fixture.assert;

var koa = require('koa');

var startServer = fixture.testResources.startTestServer;
var closeExpressServer = fixture.testResources.closeExpressServer;

var Q = require('q');

describe('when given a listening express server', function () {
    var serverWrapper, expressServer;

    before(function (done) {
        var app = koa();

        Q.spawn(function * () {
            serverWrapper = yield startServer(app);

            expressServer = serverWrapper.server;

            yield * closeExpressServer(serverWrapper);

            done();
        });
    })

    it('should close correctly', function () {
        assert.isNull(expressServer.address());
    });

    it('should unsert server', function () {
        assert.isUndefined(expressServer.server);
    });
});

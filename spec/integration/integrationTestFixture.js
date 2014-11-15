var koa = require('koa');
var bodyParser = require('koa-bodyparser');
var router = require('koa-router');
var logger = require('koa-logger')

var baseFixture = require('./../testFixture');

var getKoaApp = function getKoaApp() {
    var app = koa();
    
    app.use(logger());
    app.use(bodyParser());
    app.use(router(app));

    return app;
}


var fixture = Object.create(baseFixture);

fixture.getKoaApp = getKoaApp;

module.exports = fixture;
var express = require('express');
var app = express();
var server = require('http').createServer(app);

app.set('port', 1337);

app.use(require('compression')());
app.use(require('method-override')());
app.use(require('body-parser')());

var restify = require('restify-nedb').mount;
var config = require('restify-nedb').config;

var path = require('path');

var authMiddleware = function (req, res, next) {
    console.log('AUTHENTICATING ;]');
    return next();
};

var opts = {
    filePath: path.join(__dirname,'db','filestore.db'),
    fileName: 'test.db',
    maxAge: false, // persistent storage
    version: false, // doesn't work properly :(
    prefix: '/session',
    middleware: [authMiddleware]
};

cfg = new config(opts);

cfg.makeDateStore(function(err, ds_cfg) {
    if (!err) {
        api = new restify(ds_cfg, app);
    } else {
        console.log("Could not initialize datastore.");
    }
});

server.listen(app.get('port'), function () {
    console.log('restify-nedb example listening on %s', app.get('port'));
});

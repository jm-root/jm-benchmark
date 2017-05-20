const jm = require('jm-ms');
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var ms = jm.ms;

module.exports = function (opts) {
    opts || (opts = {});
    var port = opts.port || 80;
    var host = opts.host || '0.0.0.0';
    var root = jm.ms();

    //启动web模块
    var appWeb = express();
    var server = http.createServer(appWeb).listen(port, host, function () {
        console.log('ms server listening on %s:%s ', host, server.address().port);
    });
    appWeb.use(bodyParser.json());
    appWeb.use(bodyParser.urlencoded({extended: true}));
    var trustProxy = false;
    opts.trustProxy && (trustProxy = true);
    appWeb.set('trust proxy', trustProxy);   //支持代理后面获取用户真实ip

    //设置跨域访问
    appWeb.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'X-Forwarded-For, X-Requested-With, Content-Type, Content-Length, Authorization, Accept');
        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
        res.header('Content-Type', 'application/json;charset=utf-8');
        if (req.method == 'OPTIONS')
            res.sendStatus(200);
        else
            next();
    });
    //启动ms服务器
    var config_ms = opts.ms || [
            {
                type: 'ws'
            },
            {
                type: 'http'
            }
        ];
    for (var i in config_ms) {
        var opts = config_ms[i];
        opts.server = server;
        opts.app = appWeb;
        ms.server(root, opts, function (err, doc) {
            console.log('ms server type:%s started', opts.type);
        });
    }

    root.add('/', 'get', function (opts, cb, next) {
        cb(null, {hello: 'ms'});
    });

    return root;
};

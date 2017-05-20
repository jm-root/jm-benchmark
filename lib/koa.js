const Koa = require('koa');

module.exports = function (opts) {
    opts || (opts = {});
    var port = opts.port || 80;

    var app = new Koa();

    app.use(function (ctx) {
        ctx.body = 'Hello Koa';
    });

    app.listen(port, function(){
        console.log('koa server listening on port ' + port);
    });

    return app;
};

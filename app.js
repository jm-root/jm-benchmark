var o = require('./lib');
var port = 3000;
var name = null;
process.env['port'] && (port = process.env['port']);
process.env['name'] && (name = process.env['name']);
if(name) {
    o[name]({
        port: port ++
    });
    return;
}
o.ms({
    port: port ++
});
o.express({
    port: port ++
});
o.koa({
    port: port ++
});
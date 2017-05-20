const express = require('express');

module.exports = function (opts) {
    opts || (opts = {});
    var port = opts.port || 80;
    var app = express();

    app.get('/', function (req, res) {
        res.send('hello express')
    });

    app.listen(port, function(){
        console.log('express server listening on port ' + port);
    });
    return app;
};

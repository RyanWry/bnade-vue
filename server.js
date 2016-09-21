/**
 * Created by Administrator on 2016/9/20 0020.
 */
var koa = require('koa');
var app = koa();
var router = require('koa-router')();
var http = require("http");
var path = require('path');

app.use(require('koa-static')(path.join(__dirname, './')));

router.get('/wow/item/info/:id', function *() {
    this.set('Access-Control-Allow-Origin', '*');

    var options = {
        host: 'www.battlenet.com.cn',
        port: 80,
        path: '/wow/zh/item/' + this.params.id + '/tooltip',
        method: 'GET'
    };

    var promise = new Promise(resolve=> {
        var req = http.request(options, function (res) {
            var output = '';
            res.setEncoding('utf8');

            res.on('data', function (chunk) {
                output += chunk;
            });

            res.on('end', function () {
                resolve(output)
            });
        });

        req.on('error', function (err) {
            resolve('error')
        });

        req.end();
    });

    this.body = yield  promise;

});

app.use(router.routes()).use(router.allowedMethods());

var port = process.env.PORT || 5000;
app.listen(port, function () {
    console.log('server listening on %d, in %s mode', port, process.env.NODE_ENV);
});
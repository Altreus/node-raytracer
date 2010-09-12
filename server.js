#!/usr/bin/env node
var fs = require('fs');
var sys = require('sys');
var connect = require('connect');
var DNode = require('dnode');

var port=3030;

var html = { index : fs.readFileSync(__dirname + '/static/index.html') };

// All javascript into one file for MOAR FASTAR page loads
function bundleScript () {
    return require('dnode/web').source()
        + ('browser/setup browser/scene-fns')
        .split(/\s+/).map(function (filename) {
            var file = __dirname + '/lib/' + filename + '.js';
            var src = fs.readFileSync(file).toString()
                .replace(/^(module|exports)\..*/mg, '')
                .replace(/^var \S+\s*=\s*require\(.*/mg, '')
            ;
            
            return src;
        }).join('\n');
}

var server = connect.createServer(
    connect.staticProvider(__dirname + '/static'),
    function (req, res) {
        if (req.url == '/browser.js') {
            res.writeHead(200, { 'Content-Type' : 'text/javascript' });
            res.end(bundleScript());
        }
        else {
            res.writeHead(200, { 'Content-Type' : 'text/html' });
            res.end(html.index);
        }
    }
).listen(port);

// TODO : make a real module out of this object.
DNode(function(client) {
    this.addSphereToScene = function (obj, cb) {
        // TODO: Make classes for scene object types.
        var s = { x: 0, y: 0, z: 10, r: 10 };
        cb(s);
    }
}).listen({
    protocol : 'socket.io',
    server: server,
    transports : 'websocket xhr-multipart xhr-polling htmlfile'.split(/\s+/)
});

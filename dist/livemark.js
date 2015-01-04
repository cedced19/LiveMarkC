#!/usr/bin/env node
'use strict';
var   express = require('express'),
        app = express(),
        server = require('http').createServer(app), // Html and WebRTC Server
        serveStatic = require('serve-static'),
        io = require('socket.io').listen(server),
        fs = require('fs'),
        program = require('commander'),
        marked = require('marked'),
        katex = require('katex'),
        gdata,
        pkg = require('./package.json'),
        port = 7773,
        colors = require('colors');

program
  .version(pkg.version)
  .option('-p, --port [number]', 'specified the port')
  .parse(process.argv);

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: true,
  sanitize: true,
  smartLists: true,
  smartypants: true
});

app.use(serveStatic(__dirname));

app.get('/api', function(req, res) {
        res.json(gdata);
});

io.sockets.on('connection', function(socket){
    socket.on('change', function(data){
         data.after = marked(data.before).replace(/\n/g, '');
         gdata = data;
         io.sockets.emit('change', data);
    });
    socket.on('katex', function(data){
         data.before.replace(/#/g, '');
         data.after = katex.renderToString(data.before);
         gdata = data;
         io.sockets.emit('change', data);
    });
});

if (!isNaN(parseFloat(program.port)) && isFinite(program.port)){
  port = program.port;
}

server.listen(port, function() {
    require('check-update')({packageName: pkg.name, packageVersion: pkg.version, isCLI: true}, function(err, latestVersion, defaultMessage){
        if(!err){
            console.log(defaultMessage);
        }
    });
    console.log('Server running at\n  => ' + colors.green('http://localhost:' + port) + '\nCTRL + C to shutdown');
});
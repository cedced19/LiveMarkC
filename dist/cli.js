#!/usr/bin/env node
'use strict';
var   opn = require('opn'),
        express = require('express'),
        app = express(),
        server = require('http').createServer(app), // Html and WebRTC Server
        serveStatic = require('serve-static'),
        io = require('socket.io').listen(server),
        fs = require('fs'),
        markdown = require('markdown').markdown,
        chalk = require('chalk');

app.get('/', function(req, res) {
  fs.readFile(__dirname + '/index.html', function(err, data) {
    res.end(data);
  });
});

app.use(serveStatic(__dirname));

var gdata = false;
app.get('/data', function(req, res) {
        res.json(gdata);
});

server.listen(781, function() {
    console.log('Server running at\n  => ' + chalk.green('http://localhost:781') + '\nCTRL + C to shutdown');
    opn('http://localhost:781');
});

io.sockets.on('connection', function(socket){
    socket.on('change', function(data){
         data.md = markdown.toHTML(data.txt);
         gdata = data;
         io.sockets.emit('change', data);
    });
});
#!/usr/bin/env node
'use strict';
var   express = require('express'),
        app = express(),
        server = require('http').createServer(app), // Html and WebRTC Server
        serveStatic = require('serve-static'),
        io = require('socket.io').listen(server),
        fs = require('fs'),
        markdown = require('./showdown'),
        chalk = require('chalk');

app.get('/', function(req, res) {
  fs.readFile(__dirname + '/index.html', function(err, data) {
    res.end(data);
  });
});

app.use(serveStatic(__dirname));

var gdata;
app.get('/data', function(req, res) {
        res.json(gdata);
});

server.listen(7773, function() {
    console.log('Server running at\n  => ' + chalk.green('http://localhost:7773') + '\nCTRL + C to shutdown');
});

io.sockets.on('connection', function(socket){
    socket.on('change', function(data){
         data.after = markdown.parse(data.before).replace(/\n/g, '');
         gdata = data;
         io.sockets.emit('change', data);
    });
});
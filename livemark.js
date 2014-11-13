#!/usr/bin/env node
'use strict';
var   express = require('express'),
        app = express(),
        server = require('http').createServer(app), // Html and WebRTC Server
        serveStatic = require('serve-static'),
        io = require('socket.io').listen(server),
        fs = require('fs'),
        program = require('commander'),
        markdown = require('./showdown'),
        chalk = require('chalk');

program
  .version(require('./package.json').version)
  .option('-p, --port [number]', 'specified the port')
  .parse(process.argv);

app.use(serveStatic(__dirname));

var gdata;
app.get('/data', function(req, res) {
        res.json(gdata);
});

io.sockets.on('connection', function(socket){
    socket.on('change', function(data){
         data.after = markdown.parse(data.before).replace(/\n/g, '');
         gdata = data;
         io.sockets.emit('change', data);
    });
});

if (!isNaN(parseFloat(program.port)) && isFinite(program.port)){
  var port = program.port;
}else{
  var port = 7773;
}

server.listen(port, function() {
    console.log('Server running at\n  => ' + chalk.green('http://localhost:' + port) + '\nCTRL + C to shutdown');
});
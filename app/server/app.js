var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var path = require('path');

app.use(express.static(path.resolve(__dirname + '/../client/')));

app.get('/tarifas', function(req, res){
  res.sendFile(path.resolve(__dirname + '/../client/index.html'));
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

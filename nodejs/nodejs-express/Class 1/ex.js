const express = require('express');
const bodyParser = require('body-parser');
const server = express();
const static = require('express-static');

server.use(bodyParser.urlencoded());

server.use('',function(req,res,next){
	console.log(req.body);
	res.end();
});

server.listen(1273);

console.log('The server is running at http://localhost:1273/');



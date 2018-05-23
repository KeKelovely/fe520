const express = require('express'),
	  static = require('express-static'),
	  server = express();

var arr = [];

server.listen(2123);

server.use('/setMsg',function(req,res,next){
	arr.push(req.query);
	res.send('ok!');
});

server.use('/getMsg',function(req,res,next){
	res.send(arr);
});

server.use(static('./lib'));
console.log('The server is running at http://localhost:2123/');

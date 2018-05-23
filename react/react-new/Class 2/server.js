const express = require('express'),
	  static = require('express-static'),
	  server = express();

server.listen(2831);

server.use('/get',(req,res,next)=>{
	var arr = ['中国','俄罗斯','美国','日本'];
	res.send(arr);
});

server.use(static('./'));

console.log('The server is running at http://localhost:2831/');

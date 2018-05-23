const express = require('express'),
	  static = require('express-static'),
	  Multer = require('multer'),
	  path = require('path'),
	  fs = require('fs'),
	  server = express();
server.listen(2313);
server.use(Multer({dest:'./www'}).any());

server.use('/setFiles',function(req,res,next){
	var newFilename = req.files[0].path + path.parse(req.files[0].originalname).ext;
	fs.rename(req.files[0].path,newFilename,function(err){
		if(err){
			console.log(err);
		}else{
			res.send(newFilename);
		}
	});
});

server.use(static('./www'));

console.log('The server is running at http://localhost:2313/');

/* 上传文件系统的简单demo */
const express = require('express'),
	  multer = require('multer'),
	  fs = require('fs'),
	  path = require('path');

var server = express();
server.listen(2713);
server.use(multer({dest:'./save/'}).any());

server.post('',function(req,res,next){
	fs.rename(req.files[0].path,req.files[0].path+path.parse(req.files[0].originalname).ext,function(err){
		if(err){
			console.log(err);
		}else{
			console.log('ok!');
		}
	});
	res.send('传送成功！');
});

console.log('The server is runnning!');

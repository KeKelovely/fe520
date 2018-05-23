const express = require('express');
const static = require('express-static');
const cookieParser = require('cookie-parser');

const vip = {
	user:'leo',
	pass:'123456'
}

var server = express();
server.listen(2731);
server.use(cookieParser());
server.use('',function(req,res,next){
	res.cookie('user','leo',{maxAge:365*24*3600*1000});
	res.cookie('password','123456',{maxAge:365*24*3600*1000});
	next();
});

server.use('/leo',function(req,res,next){
	res.send({
		user:req.cookies.user,
		pass:req.cookies.password
	});
});

server.use('/login',function(req,res,next){
	console.log(req.query);
	if(req.query.user == vip.user && req.query.pass == vip.pass){
		res.send('ok!');
	}else{
		res.send('no ok!');
	}
});

server.use(static('./'));

console.log('The server is running at http://localhost:2731/');

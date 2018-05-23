const express = require('express'),
	  server = express(),
	  static = require('express-static'),
	  jade = require('jade'),
	  mysql = require('mysql');

server.listen(3263);

server.use('/list.html',function(req,res,next){
	var Pool = mysql.createPool({
		host:'localhost',
		user:'root',
		password:'zzmilove520@',
		database:'keke',
	});
	Pool.getConnection(function(err,connection){
		if(err){
			console.log(err);
		}else{
			connection.query("SELECT ID,user,textName,time FROM `a`",function(err,data){
					if(err){
						console.log(err);
						res.send('404 Not Found');
					}else{
						var str = jade.renderFile('./www/jade/1.jade',{pretty:true,arr:data});
						connection.end();
						res.send(str);
					}
				});
		}
	});
});

server.use('/news',function(req,res,next){
	var Pool = mysql.createPool({
		host:'localhost',
		user:'root',
		password:'zzmilove520@',
		database:'keke',
	});
	Pool.getConnection(function(err,connection){
		if(err){
			console.log(err);
		}else{
			connection.query("SELECT * FROM `a` WHERE ID='"+req.query.id+"';",function(err,data){
					if(err){
						console.log(err);
						res.send('404 Not Found');
					}else{
						if(data.length>0){
							var str = jade.renderFile('./www/jade/2.jade',{pretty:true,arr:data});
							res.send(str);
						}else{
							res.send('404!');
						}
						connection.end();
					}
				});
		}
	});
});

server.use('/getText',function(req,res,next){
	var Pool = mysql.createPool({
		host:'localhost',
		user:'root',
		password:'zzmilove520@',
		database:'keke',
	});

	Pool.getConnection(function(err,connection){
		if(err){
			console.log(err);
		}else{
			connection.query("INSERT INTO `a` (`user`,`textName`,`time`,`inner`) VALUES('"+
				req.query.user+"','"+req.query.textName+"','"+req.query.time+"','"+
				req.query.inner+"');",function(err,data){
					if(err){
						console.log(err);
						res.send('发送失败~！');
					}else{
						connection.end();
						res.send('发送成功！~');
					}
				});
		}
	});
});

server.use(static('./www'));
console.log('The server is running at http://localhost:3263/');

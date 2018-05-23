const express = require('express'),
	  static = require('express-static'),
	  mysql = require('mysql');

const server = express();
server.listen(2133);

server.use('/res',function(req,res,next){
	var Pool = mysql.createPool({
		'host':'localhost',
		'user':'root',
		'password':'zzmilove520@',
		'database':'keke',
	});

	Pool.getConnection(function(err,connection){
		if(err){
			console.log(err);
		}else{
			connection.query("SELECT user FROM `usertab` WHERE user='"+req.query.user+"';",function(err,data){
				if(err){
					console.log(err);
				}else{
					if(data.length > 0){
						res.send('用户名已经存在！');
					}else{
						connection.query("INSERT INTO `usertab` (`user`,`pass`) VALUES('"+
							req.query.user+"','"+req.query.pass+"');",function(err,data){
								if(err){
									console.log(err);
								}else{
									connection.end();
									res.send('注册成功！');
								}
							});
					}
				}
			});
		}
	});
});

server.use('/login',function(req,res,next){
	var Pool = mysql.createPool({
		'host':'localhost',
		'user':'root',
		'password':'zzmilove520@',
		'database':'keke',
	});

	Pool.getConnection(function(err,connection){
		if(err){
			console.log(err);
		}else{
			connection.query("SELECT user,pass FROM `usertab` WHERE user='"+
				req.query.user+"'AND pass='"+req.query.pass+"';",function(err,data){
					if(err){
						console.log(err);
					}else{
						if(data.length>0){
							res.send('登录成功！');
						}else{
							res.send('登录失败~！');
						}
						connection.end();
					}
				});
		}
	});
});
server.use(static('./lib'));
console.log('The server is running at http://localhost:2133/');

const express = require('express');
const server = express();
const bodyParser = require('body-parser');

const json = {
	leo: '123456',
}

server.listen(2133);


server.use(bodyParser.urlencoded({ extended: false }));

server.use('/postInfo',function(req,res){
	//console.log(req.body);
	if(json[req.body.user] == req.body.pass){
		res.send({
			ok: 1,
			msg: '登录成功！'
		})
	}else{
		res.send({
			ok: 0,
			msg: '登录失败'
		})
	}
});

server.use('/getInfo',function(req,res){
	//console.log(req.query);
	if(json[req.query.user] == req.query.pass){
		res.send({
			ok: 1,
			msg: '登录成功！'
		})
	}else{
		res.send({
			ok: 0,
			msg: '登录失败'
		})
	}
});

server.use(express.static('./'));

console.log('The server is running at http://localhost:2133');

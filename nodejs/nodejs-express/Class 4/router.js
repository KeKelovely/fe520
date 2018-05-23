const express = require('express');

var server = express();
server.listen(8020);
var userRouter = express.Router();
var newsRouter = express.Router();

server.use('/user',userRouter);
server.use('/news',newsRouter);

userRouter.use('/hello',function(req,res){
	res.send('Hello!');
});

newsRouter.use('/sky',function(req,res){
	res.send('Welcome!');
});

console.log('The server is running at http://localhost:8020/');

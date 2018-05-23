const express = require('express'),
	  jade = require('jade'),
	  allArr = require('./data.js');
var server = express();

server.listen(2138);
var userRouter = express.Router();
var listRouter = express.Router();
var newsRouter = express.Router();

server.use('/user',userRouter);
server.use('/list',listRouter);
server.use('/news',newsRouter);

const titlename = ['user','list','news'];

server.use('',function(req,res,next){
	let needArr = !req.query.page?allArr.user.slice(0,3):allArr.user.slice(req.query.page*3,req.query.page*3+3);
	
	if(req.query.page == '0' || !req.query.page || req.query.page<0){
			var needPage = 0;
		}else{
			var needPage = req.query.page;
		}	
	let maxL = Math.ceil(allArr.user.length/3);	
	var str = jade.renderFile('./index.jade',{
		pretty:true,
		titlename:titlename[0],
		DataArr:needArr,
		page:needPage,
		maxL:maxL,
		linkNode:'user',
	});
	res.send(str);
});

userRouter.use('',function(req,res,next){
	let needArr = !req.query.page?allArr.user.slice(0,3):allArr.user.slice(req.query.page*3,req.query.page*3+3);
	
	if(req.query.page == '0' || !req.query.page || req.query.page<0){
			var needPage = 0;
		}else{
			var needPage = req.query.page;
		}	
	let maxL = Math.ceil(allArr.user.length/3);	
	var str = jade.renderFile('./index.jade',{
		pretty:true,
		titlename:titlename[0],
		DataArr:needArr,
		page:needPage,
		maxL:maxL,
		linkNode:'user',
	});
	res.send(str);
});

listRouter.use('',function(req,res,next){
	let needArr = !req.query.page?allArr.list.slice(0,3):allArr.list.slice(req.query.page*3,req.query.page*3+3);
	
	if(req.query.page == '0' || !req.query.page || req.query.page<0){
			var needPage = 0;
		}else{
			var needPage = req.query.page;
		}
	let maxL = Math.ceil(allArr.list.length/3);	
	var str = jade.renderFile('./index.jade',{
		pretty:true,
		titlename:titlename[1],
		DataArr:needArr,
		page:needPage,
		maxL:maxL,
		linkNode:'list',
	});
	res.send(str);
});

newsRouter.use('',function(req,res,next){
	let needArr = !req.query.page?allArr.news.slice(0,3):allArr.news.slice(req.query.page*3,req.query.page*3+3);
	
	if(req.query.page == '0' || !req.query.page || req.query.page<0){
			var needPage = 0;
		}else{
			var needPage = req.query.page;
		}
	let maxL = Math.ceil(allArr.news.length/3);		
	var str = jade.renderFile('./index.jade',{
		pretty:true,
		titlename:titlename[2],
		DataArr:needArr,
		page:needPage,
		maxL:maxL,
		linkNode:'news',
	});
	res.send(str);
});

console.log('The server is running at http://localhost:2138/');

const jade = require('jade');
const fs = require('fs');
var str = jade.renderFile('./1.jade',{pretty:true});

fs.writeFile('./1.html',str,function(err){
	if(err){
		console.log('error!');
	} else{
		console.log('ok!');
	}
})

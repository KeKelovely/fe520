var mysql = require('mysql');
var options = {
	host:'localhost',
	user:'root',
	password:'zzmilove520@',
	database:'keke'
};
var pool = mysql.createPool(options);
pool.getConnection(function(err,connection){

	if(err){
		console.log('连接失败');
	}
	else{
		connection.query('INSERT INTO `usertab` (`ID`,`user`,`pass`) VALUES("4","keke","789");',function(err,data){
			if(err){
				console.log(err);
			}
			else{
				console.log(data);
				connection.end();
			}
		});
	}
});


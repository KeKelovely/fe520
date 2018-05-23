var ajax = function(option){
	var ajax = (window.XMLHttpRequest)?(new XMLHttpRequest()):(new ActiveXObject("Microsoft.XMLHTTP"));

	var JsontoString = function(json){
		var arr = [];
		for (var i in json){
			arr.push(i+'='+json[i]);
		}
		return arr.join('&');
	}
	if (option.type == 'get'){
		ajax.open('get',option.url+'?'+JsonToString(option.data),true);
		ajax.send();
	}else if (option.type == 'post'){
		ajax.open('post',option.url,true);
		ajax.setRequsetHeader("Content-Type","application/x-www-form-urlencoded");
		ajax.send(JsonToString(option.data));
	}

	ajax.onreadystatechange = function(){
		if (ajax.readyState == 4){
			if(ajax.status >= 200 && ajax.status < 300 || ajax.status == 304){
				option.success(ajax.responseText);
			}else{
				console.log('服务器错误！');
			}
		}
	};
}

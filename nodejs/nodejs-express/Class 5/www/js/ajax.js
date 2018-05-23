var ajax = function(option){
	if(window.XMLHttpRequest){
		var xhr = new XMLHttpRequest();
	}else{
		var xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}

	var JsonToString = function(json){
		var arr = [];
		for(var i in json){
			arr.push(i+'='+json[i]);
		}
		return arr.join('&');
	};

	if(option.type == 'get'){
		xhr.open('get',option.url+'?'+JsonToString(option.data),true);
		xhr.send();
	};

	if(option.type == 'post'){
		xhr.open('post',option.url,true);
		xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		xhr.send(option.data);
	};

	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4){
			if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304){
				option.success(xhr.responseText);
			}else{
				console.log('error!');
			}
		}
	};
};

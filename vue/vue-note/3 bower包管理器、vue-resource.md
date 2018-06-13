# 4 bower包管理工具、Vue的交互与vue-resource的应用

## 4.1 bower介绍
- bower是一个==专注于前端==的包管理工具（使用前请在全局环境下install -g）
- bower中的版本号用#表示(不是@)
- bower i 下载的库的名字#版本号

## 4.2 vue-resource插件介绍
- vue本身并没有提供和后端交互的方法，而官方推荐了一个插件：vue-resource，用以提供各类资源、插件、项目
- vue-resource主要给vue1.x提供如ajax、jsonp等方法，这也是本章介绍的主题
- vue-resource在vue对象上添加了若干方法，如$http，你可以通过在vue对象内部使用this.$http.xxx调用

## 4.3 vue-resource的GET方法
- vue-resource添加了一个this.$http方法用以交互，注意是封装成了Promise的用法，因此需要使用.then语法
- 基本语法格式：this.$http.get('url',data).then(function(){success},function(){failed})
```
methods: {
	ajax: function(){
		this.$http.get('http://localhost:2133/getInfo',{
			user: this.user,
			pass: this.pass
		}).then(function(responseText){
			//console.log(responseText); 
			if(responseText.data.ok == 0){
				alert(responseText.data.msg);
			}else if(responseText.data.ok == 1){
				alert(responseText.data.msg);
			}
		},function(){
			alert('大失败~！');
		})
	}
}
```

## 4.4 vue-resource的POST方法
- 同样是用this.$http.post进行交互，并封装成Promise的语法，注意需要添加emulateJSON属性用以说明是用post传输的json数据
- 基本语法格式：this.$http.post('url',data,{emulateJSON:true}).then(function(){success},function(){failed})
```
methods: {
	ajax: function(){
		this.$http.post('http://localhost:2133/postInfo',{
			user: this.user,
			pass: this.pass
		},{
			emulateJSON:true
		}).then(function(responseText){
			//console.log(responseText); 
			if(responseText.data.ok == 0){
				alert(responseText.data.msg);
			}else if(responseText.data.ok == 1){
				alert(responseText.data.msg);
			}
		},function(){
			alert('大失败~！');
		})
	}
}
```

## 4.5 vue-resource的jsonp方法
- 利用DOM元素中的src属性可以跨域调用的原理，用script标签跨域调用外部API接口
- 外部API接口可以在开发者工具中的Network中获取
- 基本语法格式：this.$http.jsonp('api-url',data,{jsonp:callback-key}).then(function(){success},function(){failed})

```
methods: {
	query: function(){
		this.$http.jsonp("https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su",{
			wd: this.wd
		},{
			jsonp: 'cb' // 此处jsonp属性的值应为对应API接口上的callback函数query上的键
		}).then(function(json){
			//console.log(json.data.s);
			for(var i in json.data.s){
				this.arr.push(json.data.s[i]);
			}
		},function(){
			console.log('error!');
		})
	}
}
```
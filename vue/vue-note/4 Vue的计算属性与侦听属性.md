# 5 Vue的computed计算属性与$watch侦听属性

## 5.1 computed计算属性

### 5.1.1 基本用法

- vue的computed以对象的形式传入计算属性，和data类似，但是在computed中允许对数据进行计算
- computed属性在多数情况下必须是一个函数（前提是你不向其中传入参数）

```
new Vue({
	el: 'body',
	data: {
		a: '',
	},
	computed: {
		b: function(){
			return this.a + 20;
		}
	}
})
```

### 5.1.2 向computed属性传入参数
- 以对象而不是函数的形式传入get与set函数，get函数用来读取值（也就是computed的默认用法），set函数用来传入参数或是设置参数
- 注意，向get函数传入参数是没有任何效果的
- 例如在下面的例子中，向vue.c显式的传入值10,10就会被自动赋给set函数中的参数，换言之，vue.c的值实际上就是指向的set函数的参数，而不会对get函数有任何影响，get函数只用于return
- 总结：set是入口，用于显式地传入参数，get是出口，用于返回数据，提供给外部模板使用
```
var vue = new Vue({
	el: 'body',
	data: {
		a: '',
		b: '',
	},
	computed: {
		c: {
			get: function(){
				return this.a;
			},
			set: function(argument){
				this.b = 20;
				this.a = this.b + argument; 
			}
		}
	}
})

vue.c = 10; // argument = vue.c = 10;
```

## 5.2 $watch侦听属性

- 添加$watch的侦听属性，当变量or数据发生变化时，就会触发回调函数
- 基本格式：vue.$watch(data,callback),当data发生变化时，callback被调用
```
var vue = new Vue({
	el: 'body',
	data: {
		a: 10
	}
});

vue.$watch('a',function(){
	console.log('vue中的data.a发生了变化')
})
```
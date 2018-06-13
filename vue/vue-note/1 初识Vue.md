# 第一讲 初识Vue.js

## 1.0 Vue简介
- vue分为1.x与2.x两个主要版本，1.x是基础，需要了解
- 原生js、jQuery是==事件驱动==，关注DOM元素及其事件
- vue框架是==数据驱动==，关注DOM元素中的数据变化，用模板来渲染

## 1.1 Vue的基本语法
- 使用构造函数引入Vue：
```
new Vue(json);

new Vue({
		el: 'body', // el即element,用以指定vue渲染的DOM元素范围
		data: {
				msg: 'hello vue!'
			} // data即数据，以对象的形式传入
	})
```
- 在常规文档流的DOM元素中以==模板==的方式引入
```
<body>
	{{msg}} // vue的模板一律==默认为两重花括号==~这和JSX略有不同
</body>
```
- 总结：
	- el：vue输出的作用域
	- data：vue输出的数据
	- 渲染方式：模板，即你放入data中的定义的变量

## 1.2 vue的常用指令
- 注意：指令不同于事件，你可以看作是vue自带的一些封装好的插件，可以实现一些效果，方便我们使用

### 1.2.1 v-show控制显示和隐藏
- 使用v-show:true/false来控制DOM元素的显示or隐藏
```
<div v-show="false"></div>
```
- 也可以传入vue的data来控制
```
<div v-show='show'></div>

new Vue({
	el: 'body',
	data: {
		show: 'true'
	}
})
```

### 1.2.2 for循环

#### 1.2.2.1 用for来循环数组
- 在vue中，for的循环变量i表示==数组的值==，$index表示数组的索引，注意这和原生js不同！
- 在DOM元素中使用v-for方法可以循环生成多个DOM元素
```
<div v-for='i in arr'>{{i}}</div>
<div v-for='i in arr'>{{$index}}</div>
```
- 数组arr应当在Vue的data中定义：
```
new Vue({
		el: 'body',
		data: {
			arr: ['a','b','c']
		}
	})
```

#### 1.2.2.2 用for来循环对象
- 同样，对象json应当在Vue的data中定义：
```
new Vue({
		el: 'body',
		data: {
			json: {
				name: 'keke',
				age: 18,
				home: 'YC'
			}
		}
	})
```
- 请使用(key,value) in json的格式来循环Object
```
<div v-for='(key,value) in json'>{{key}} : {{value}}</div>
```

### 1.2.3 v-model：双向绑定（实现DOM元素的值与vue数据的绑定）
- 使用v-model = 'msg'来绑定，注意msg应当在Vue的data中定义。


## 1.3 Vue的DOM事件与交互方法
### 1.3.1 Vue事件的基本表示方法
- 事件event在Vue对象中以methods的形式加载：
```
new Vue({
		el: 'body',
		data: {
			msg: 'hello vue!'
		},
		methods: {
			methods_name: function(){
				alert('hello vue!');
				console.log(this.msg);
			}
		}
	})
```
- 要想在DOM元素中引入vue事件，需要使用v-on或@标记：
```
<div v-on:click = 'methods_name'></div>
<div @click = 'methods_name'></div>
```
- 一般来说，用@标记的形式会更加友好，便于开发。

### 1.3.2 demo：显示和隐藏
- 使用@click实现

### 1.3.3 demo：获取鼠标坐标
- 通过向methods函数显式地传入$event参数的方式，来获取DOM元素上的event对象（与参数传入的顺序无关）
```
<body @click='changed(argument,$event)'>
```
- 复习：利用MouseEvent事件上的event.clientX和event.clientY来获取当前屏幕光标的坐标值

### 1.3.4 demo：阻止事件冒泡
- 原生方法：event.cancelBubble = true / event.stopPropagation()
- vue中，提供了stop方法来阻止事件的冒泡： @click.stop='methods_name'

### 1.3.5 demo：键盘事件
- vue中提供了对键盘值的便利操作，如使用@keydown.65来直接获取键盘上的值（65即a）

## 注意！
- 在Vue 1.x版本出来的时候还并未普遍支持ES6语法，因此请尽量使用ES5的操作（如箭头函数改为function匿名函数）
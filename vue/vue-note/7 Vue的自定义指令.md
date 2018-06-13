# 8 Vue的自定义指令
- 如v-for、v-show等DOM元素中可使用的属性被称为vue的指令。同样，我们可以自定义若干的vue指令方便使用~

## 8.1 自定义指令的基本语法

### 8.1.1 Vue.directive
- 使用Vue.directive方法自定义属性：Vue.directive(name,function)
```
Vue.directive('myDirect',function(){
	console.log(this);
}) // this表示作用在该DOM元素上的一个vue对象
```
- 在DOM元素中使用该自定义指令
```
<div v-my-direct></div>
```

### 8.1.2 命名规则（驼峰命名法的转换）
- 小写ok
- 如果你定义的指令名中含有大写字母（驼峰命名），在DOM元素中使用该指令时，应将大写改为小写，并使用“-”连接
- 例如：
```
Vue.directive('randomColor',function(){...});

<div v-random-color></div>
```

## 8.2 向自定义指令传入参数
- 在DOM元素中传参：
```
<div v-my-direct='arg'></div>
```
- 在传参时，应当在预先定义的Vue对象的data属性中显式地定义传入的参数名，（预置为0），否则在directive方法中接收到的参数将是undefined
```
<div v-my-direct='arg'></div>

<script>
	Vue.direact('myDirect',function(val){
		console.log(val);
	})

	new Vue({
		el: 'body',
		data: {
			arg: '',
		}
	})
</script>
```
- 当然，使用这种单向绑定的方式不够直观，预设参数的方式也容易出错，因此建议采用model-view的双向绑定写法，参考8.3

## 8.3 Vue.directive的双向绑定写法

- 语法格式：Vue.directive(name,{ bind(){}, update() })
- 第二个参数是一个对象，其中bind函数用来获取绑定DOM元素的属性和参数（相当于初始化数据），不接受任何参数
- update函数会在bind函数获取的属性or参数发生变化时，自动调用,同时update函数也用来接收参数~
- 即bind用来初始化，update则是当数据改变时，就会自动调用一次~

```
Vue.directive('myDirect',{
	bind(){
		//
	},
	update(val){
		//
	}
});
```

## 8.4 属性元素
- 类似于自定义的DOM元素（组件），但注意这不是组件
- 基本格式：
```
<body>
	<reddiv>这是自定义的属性元素~</reddiv>
</body>
<script>
	Vue.elementDirective('reddiv',{
		bind(){
			this.el.style.background = 'red';
		}
	});
</script>
```
- 属性元素不支持update和传参，返回值是undefined（控制台会提示warning，建议你使用Vue的Component）
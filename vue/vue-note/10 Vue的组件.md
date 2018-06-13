# 12 Vue的组件

## 12.1 Vue全局组件

### 12.1.1 全局组件的定义
- 要使用全局组件，首先你应设计好一个模板：（类比React中的render）,使用Vue.extend({})方法
```
var leo = Vue.extend({
	template: `<h1>Hello Vue!</h1>
				<p>{{name}}</p>`,
	data(){
		return ({
			name: 'keke',
			age: 18
		})
	}
});
```
- 注意：
	- template属性表示模板渲染，请使用==模版字符串==的格式，即反引号
	- 在Vue.extend定义的模板中，作者建议将data以函数的形式表示，并return一个对象，以此和一般的Vue对象相区分

### 12.1.2 全局组件的使用
- 在定义好组件的模板后，你还需要使用Vue.component(name,template)方法，给模板显式地命名并引用
```
Vue.component('aaa',leo);
```
- 其中，第一个参数是你的组件名，第二个参数是你预先定义的模板名
- 然后在文档中使用该组件(最好使用闭合标签的格式)
```
<aaa></aaa>	
```


### 12.1.3 注意事项
- 组件只是方便我们开发与使用，==并不会==出现在实际的DOM文档中
- 以上面的例子为例，最终用户看到的只有h1标签，而不是所谓的aaa标签


# 12 Vue的组件

## 12.2 局部组件及模板

- 使用Vue.component方法生成的是==全局组件==，可以在任何位置使用
- 局部组件是指只能在特定的作用域内使用的组件，在Vue对象的components属性中定义

### 12.2.1 局部组件的定义
- 示例代码：
```
new Vue({
	el: 'div',
	components: {
		// 属性是组件名，值是模板名称
		aaa: 'leo'
	}
})
```

### 12.2.2 在Vue对象内部定义模板
- 示例代码：
```
new Vue({
	el: 'body',
	components: {
		aaa: {
			data(){
				return ({msg:'嘤嘤嘤'})
			},
			template: `<h1>components: {{msg}}</h1>`
		}
	}
})
```
- 注意：按照常规操作，Vue对象内的组件并不具有==闭包==的特性，即如果你在template中引用了Vue的data内的数据，（如{{data_msg}}）是无法被渲染的
- 总结：除了components的组件（aaa）内部定义的data外，外面所有的数据、属性通过==常规方法无法获取到==

### 12.2.2 为局部组件添加事件
- 示例代码：注意在组件内部定义
```
new Vue({
	el: 'body',
	components: {
		aaa: {
			data(){
				return ({msg:'yingyingying'})
			},
			methods:{
				add(){
					this.msg = 'sb'
				}
			},
			template: `<h1>I want to say: {{msg}}</h1>`
		}
	}
})
```

### 12.2.3 使用template元素来添加模板

- 首先在DOM文档中声明一个template元素：
```
<template id='mycomponent'>
	{{msg}}
</template>
```
- 然后你就可以让组件中的tamplate属性指向该DOM元素，作为一个引用，template元素自身不会被渲染到文档中
```
template: '#leo'
```

- 你还可以使用script标签来实现一个模板引擎（了解就好...）
```
<script type='text/x-template' id='mycomponent'>
	<div>{{msg}}</div>
</script>
```

### 12.2.4 vue的动态组件（现在多数用路由实现）
- 效果：动态渲染不同的组件类型，用component闭合标签实现
```
// 渲染aaa组件
<component :is='aaa'></component>	

// 给is属性赋一个变量，用以实现动态的组件渲染
<component :is='msg'></component>
```
- 总结：使用is属性，is属性是哪个组件，就把名字直接传递给is属性即可

## 12.3 父子及组件交互

### 12.3.1 子组件的定义与使用

- 直接在component的组件内定义新的component对象，作为该组件的子组件
```
new Vue({
	el: '#myDiv',
	components: {
		aaa: {
			template: '#aaa',
			components: {
				bbb: {
					template: '#bbb'
				}
			}
		}
	}
})
```

- 相应的，你需要在父组件的模板（而不是常规的DOM文档）中插入子组件标签
```
<body>
	<div id="myDiv">
		<aaa></aaa>
	</div>

	<template id="aaa">
		<h1>我是父组件~</h1>
		<bbb></bbb>
	</template>

	<template id="bbb">
		<h1>我是子组件~</h1>
	</template>
</body>
```

- 依次嵌套下去，你可以甚至可以造出一颗“组件树”
- 同时要注意父子组件的嵌套关系，父组件只能接受子组件，==不能接受孙子级和更往后的子代组件==

### 12.3.2 子-父组件交互

#### 12.3.2.1 子级向父级传递

- 例如，如何让aaa获取到父级（也就是Vue对象绑定的#myDiv）中的data属性呢？（也就是我们之前提到的闭包）
- 示例代码：
```
<div id="myDiv">
	<aaa :pardata='msg'></aaa>	
</div>

<template id='aaa'>
	<h1>我是子级组件aaa~</h1>
	<span>我是父组件传过来的数据：</span><h2>{{pardata}}</h2>
</template>

<script>
	new Vue({
		el: '#myDiv',
		data: {
			msg: 'parent DATA'
		},
		components: {
			aaa: {
				props: ['pardata'],
				template: '#aaa'
			}
		}
	})
</script>
```
- 总结：在子组件中，使用props属性，注意props接收数组形式的参数，props对应组件元素中的属性（类似于React中的props）
- 所以，组件的参数中可以接受来自父组件的数据，然后通过props的方式，间接传递给子组件。
- **注意！！**，和React中类似，传入的props参数应当是在DOM文档中调用的组件元素，而不是在模板中传入哦！！

#### 12.3.2.2 定义数据类型
- 你可以向子组件的props传递一个对象，用来指明允许接收的数据类型
- 示例代码：
```
components: {
	aaa: {
		props: {
			data1: String,
			data2: Number
		},
		template: '#aaa'
	}
}
```


# 12 Vue的组件

## 12.4 子级传递交互（子传父）

### 12.4.1 子级传递数据的基本方法
- 子组件使用@emit()方法向父组件传递数据
- 示例代码：
```
<template id='parent'>
	<h1>我是父组件的模板~</h1>

	<children @child-msg='getmsg'></children>	
</template>

<script>
components: {
	parent: {
		methods: {
			getmsg(msg){
				console.log(msg);
			}
		},
		data(){
			return({msg:'parent data'})
		},
		components: {
			'children': {
				methods: {
					emitNode(){
						// 第一个参数：自定义传递的数据名，第二个参数：传递的数据
						this.@emit('child-msg',this.msg);
					}
				}
			}
		}
	}
}
</script>
```
- 首先，我们需要在子组件的methods中定义一个方法，并使用this.@emit(name,data)方法传递数据
- 然后在子组件的Vue元素中添加@name = 'data_name'属性，同时在父组件中定义同名方法，并接收传递的参数data_name
- 总结：和React类似，相当于父组件定义一个方法（含参），同时传递给子组件，子组件使用@emit方法与之关联，从而进行数据交互

## 12.5 slot部分

### 12.5.1 slot的含义与用法
- 通过在组件模板中添加slot标签，可以渲染组件的闭合标签内的DOM元素

- 不使用slot标签时，leo组件中的h1和h2都无法被正常渲染在文档中：
- 添加slot标签后，组件内的DOM元素可以被正常渲染显示
```
<leo>
	<h1>今天天气不错~</h1>
	<h2>真的吗？~</h2>
</leo>

<template>
	<h1>哈哈哈~</h1>
	<slot></slot>
</template>
```
- 总结：组件中可以放入任何html代码，如果想让它们显示，需要在组件模板中使用slot标签
- slot标签相当于引用了你在组件中插入的html代码

### 12.5.2 多个slot的使用
- 有没有办法指定slot所引用的html代码块呢？（换言之，我们不希望让slot一次性引用所有的html代码）

```
<leo>
	<h1 slot='h1-slot'>哈哈啊哈</h1>
	<h2 slot='h2-slot'>呵呵呵~</h2>
</leo>

<template id='aaa'>
	<slot name='h1-slot'></slot>
	<h3>haahahah~</h3>
	<slot name='h2-slot'></slot>
</template>
```
- 总结：为DOM元素添加slot属性及值，然后在模板的slot元素中为其添加name属性，就可以实现两者的对应引用

### 12.5.3 个人的一些小感想
- 在Vue1.x版本中，和React不同，Vue组件内的内容正常情况不会被渲染，此外，Vue组件也必须使用闭合标签的形式：
```
<myComponent>
	<h1>this is my content</h1> <!-- h1的内容并不会被渲染，你需要使用slot -->
</myComponent> <!-- 必须使用闭合标签，不能用单标签 -->
```

# 第二讲 Vue.js的模板、属性、class及style
## 2.1 Vue的模板
- vue中，以==双重花括号==的形式来声明一个模板，若带有星号，则默认初始渲染一次，以后不能再渲染（“写死了”）
```
{{msg}}
{{*msg}}
```
- 当data改变时，未带星号的模板变量会重新渲染

### 2.1.1 两种不同的渲染方式
- innerText：直接以字符串的形式输出，不转义，不解析div等元素，这在vue中以{{}}的方式实现
- innerHTML：解析成DOM元素的形式输出，在vue中以{{{}}}的方式实现
```
msg = '<div>111</div>'
{{{msg}}} // 渲染结果： 111（以块元素的形式）
{{msg}} // 渲染结果： '<div>111</div>'(以字符串的形式)
```

## 2.2 Vue的属性
- 如果在DOM元素的属性中要引入vue中的data，你可以使用模板或v-bind方法，同时，v-bind方法还可以省略掉v-bind，只用冒号来表示
```
new Vue({
		el: 'body',
		data: {
			url: 'https://localhost/hello.jpg'
		}
	})
// 使用模板方式引入
<img src={{url}}>

// 使用v-bind方式引入
<img v-bind:src="url">
// 或
<img :src="url">
```
- 可见，使用v-bind:的方法，可以直接以==字符串字面量==的方式引入vue中的data，避免了模板的多重花括号噩梦，因此这里推荐使用此方法！

- 下面的2.3与2.4将详细介绍两个常用的vue属性：class与style

## 2.3 Vue的Class
- 当然你可以用原生的字符串字面量的方式传入class，没人拦着你这么干
```
<div class="header"></div>
```
- 你也可以借助v-bind方法，以数组形式传入class
```
<div :class="myDiv"></div> // 等价于<div :class="red shadow"></div>

new Vue({
		el: 'body',
		data: {
			myDiv: ['red','shadow']
		}
	})
```
- 你还可以借助v-bind方法，以json形式传入class
```
<div :class="myDiv"></div> // 等价于<div :class="red shadow"></div>

new Vue({
		el: 'body',
		data: {
			myDiv: {
				red: true,
				shadow: true
			}
		}
	})
```

## 2.4 Vue的Style
- 相比于class而言，style的引入方式显然以json格式为最佳实践
```
new Vue({
		el: 'body',
		data: {
			myDiv: {
				width: '200px',
				height: '200px',
				background: 'yellow'
			}
		}
	})

<div :style='myDiv'></div>
```
- 当然，注意json格式不适用于模板，模板会把json解析为[Object Object]，这也是为什么我们建议v-bind方法为最佳实践，并搭配json传递vue的data的原因之所在~

- 你也可以建立多个json对象，然后放在一起以数组的形式传入DOM元素
```
new Vue({
		el: 'body',
		data: {
			color: {
				background: 'yellow'
			},
			size: {
				width: '200px',
				height: '200px'
			}
		}
	})

<div :style="[color,size]"></div>
```
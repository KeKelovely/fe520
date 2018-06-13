# 13 Vue的路由（仅限1.x版本）

- 路由：SPA 单页Web应用 （根据不同的地址，在一个页面中显示不同的内容/效果/数据）
- 需要使用路由插件来实现
- Vue1.x版本中，对应的vue-router版本是#0.7.13

## 13.1 路由的搭建：a标签
- 示例代码：
- 为a标签添加v-link属性，并指定路径
- 与React类似，添加router-view，用以指定输出的router页面(v-link的变化会引起该标签内容的改变)
```
<div id='box'>
	<a v-link='{path:"/home"}'>首页</a>
	<a v-link='{path:"/news"}'>新闻</a>
	<router-view></router-view>	
</div>
```

- 然后，按照步骤依次书写路由：

```
	<script>
		// 1. 准备全局组件(用一个空组件来启动路由)
		var app = Vue.extend();

		// 2. 准备组件
		var home = Vue.extend({
			template:`<h1>我是首页</h1>`
		});

		var news = Vue.extend({
			template:`<h1>我是新闻页</h1>`
		});

		// 3.准备路由
		var router = new VueRouter();

		// 4. 关联路由和页面
		router.map({
			'home': {
				component: home
			},
			'news': {
				component: news
			}
		})

		// 5. 启动路由
		router.start(app,'#box');

		// 6. 添加默认显示页面
		router.redirect({
			'/': 'home',
		})
	</script>
```

### 13.1.2 路由的样式
- 在为a标签添加v-link属性后，渲染到文档中时，a标签会被添加一个.v-link-active类
```
<a href="#!/home" class="v-link-active">首页</a>
```
- 通过为.v-link-active添加css样式，可以丰富交互效果

## 13.2 路由的嵌套：多层地址
- 要嵌套路由，首先要在模板中再使用a标签及v-link属性：
- 注意：只要添加了a标签及v-link，就需要加上router-view，用来提供渲染页面的DOM元素
```
<template id='component1'>
	<h1>content111</h1>
	<a v-link='{path: "/component1/eat"}'>我喜欢的食物~</a>
	<a v-link='{path: "/component1/love"}'>我喜欢的人~</a>
	<router-view></router-view>
</template>

<template id='eat'></template>
<template id='love'></template>
```

- 同时，需要在router.map中指定对应的页面，将路由和页面关联起来，使用subRoutes指定嵌套的子路由
- 属性就是路由的地址，值就是component，component用来指定组件
```
router.map({
	component1: {
		component: {
			template: '#component1'
		},
		subRoutes: {
			eat: {
				component: {
					template: '#eat'
				}
			},
			love: {
				component: {
					template: '#love'
				}
			}
		}
	}
})
```

## 13.3 子路由数据交互

- 有可能你的v-link中有参数，例如：
```
<a v-link="{path:'/search/detail/0231?a=12'}">小说一</a>
<a v-link="{path:'/search/detail/2183?a=13'}">小说二</a>
```
- 你可以在subRoutes的定义中，为路径添加参数：
```
subRoutes: {
	'/detail/:id': {
		component: {
			template: '#detail'
	}
}
```
- 然后，你就可以获取到$route对象上的参数，如$route.parmas/$route.path/$route.query
```
	<template id="detail">
		<h1>{{$route.params | json}}</h1>
		<h1>{{$route.path}}</h1>
		<h1>{{$route.query | json}}</h1>
	</template>
```
- 最后，我们只需要将父组件上的params数据传递给子组件即可：
```
<template id='detail'>
	<childcomponent :params='$route.params'></childcomponent>
</template>

<script>
	components: {
		childcomponent: {
			props: ['params'],
			template: '#childcomponent',
			methods: {
				s(){
					console.log(this.params);
				}
			}
		}
	}
</script>
```


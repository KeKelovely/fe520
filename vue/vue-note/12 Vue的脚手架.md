# 14 Vue脚手架的使用(1.x版本)

## 14.0 预安装

- 首先你需要在全局环境中安装vue脚手架工具：vue-cli
```
$ cnpm install vue-cli -g

...installed

$ vue --version
```

## 14.1 Simple脚手架的使用
- 要想使用simple类型的脚手架，在开发目录下打开命令行，并输入：（注意是1.x版本）
```
// keke-simple是你的文件夹名
$ vue init simple#1.0 keke-simple
```
- 缺点：过于简单，缺乏完善的配置环境，还不如自己写233

## 14.2 Webpack脚手架的使用
- 安装时同样在命令行中输入：
```
// vue-demo1-wp是你的文件夹名
$ vue init webpack#1.0 vue-demo1-wp
```
- to get started:
```
cd vue-demo1-wp
npm install
npm run dev
```
- 在脚手架目录的src下，App.vue定义了你的渲染模板，main.js作为接口整合并输出（类似于React脚手架的app.js）,components文件夹中存储了vue组件
- 记得学习项目文件构建的形式，用.vue来定义组件和最终的渲染模板

## 14.3 Webpack-simple脚手架的使用
- wps的好处是，既没有simple那样简单，又没有webpack脚手架那样复杂，适合创建一些小型的demo，比较适合练习
```
$ vue init webpack-simple#1.0 vue-demo2-wps
```

## 14.4 总结：webpack脚手架下的项目文件管理
- 文档树：
```
|---App.vue
|---main.js
|
|---assets
|   ----logo.png
|
|---components
    ----Hello.vue
```
- App.vue：主要模板文件，用于导入各组件，最后整合为一个App组件进行输出
- main.js：入口文件，用于导入APP组件，并调用new Vue()构造函数，生成最后所需的渲染页面
- assets：用于存放静态资源
- components文件夹：用于存放各类组件
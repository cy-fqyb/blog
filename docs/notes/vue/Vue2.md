---
title: Vue2
date: 2022-10-03 09:37:58
categories: 
  - notes
  - vue
tag: Vue
tags: 
  - null
permalink: /pages/152fcb/
---

# vue2 学习笔记

[vue2 官方文档](https://v2.cn.vuejs.org/)

# 自定义指令

[官方文档](https://v2.cn.vuejs.org/v2/guide/custom-directive.html)

- 自定义指令分为全局自定义指令,和组件局部自定义指令

- 全局自定义指令

```js
Vue.directive("fbind", {
  bind(el,binding){
    el.value = binding.value;
  }
  inserted(el, binding) {
    el.focus;
  },
});
```

- 局部组件自定义指令

```js
//在组件中的directives对象中配置自定义指令

directives: {
    //directives对象用于自定义指令
    //自定义指令处理函数,会传入两个参数。一个是指令所在的真实DOM元素,另一个是指令所关联的值
    //自定义指令处理函数何时会被调用:1.指令和元素绑定成功时(第一次),2.指令所在的模板被重新解析
    //函数式自定义指令
    big(element, binding) {
      element.innerText = binding.value * 10;
      //该函数中的this指向window
    }
    //对象式函数指令
    fbind: {
      bind(el, binding) {
        el.value = binding.value;
      },
      inserted(el, binding) {
        el.value = binding.value;
        el.focus();
      },
      update(el, binding) {
        el.value = binding.value;
      },
    },
}
```

## 自定义指令的钩子函数

自定义指令存在生命周期
一个指令存在几个钩子函数(即在某些特殊时期，自动被调用的函数)

- bind 函数:只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
- inserted 函数:被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
- update 函数:模板被重新解析时调用
- componentUpdated 函数:指令所在组件的 VNode 及其子 VNode 全部更新后调用。
- ubind 函数:只会调用一次,当指令与元素解绑时被调用

## 使用自定义指令需要注意的问题

1. 自定义指令的命名:无法使用小驼峰命名，如**v-bigNumber**中的 **bigNumber** 会被解析为 **bignumber**,官方推荐使用(v-big-number)

2. 自定义指令中的回调函数中的 this 指向:vue 不会维护自定义指令中的回调函数,所以自定义指令中的回调函数中的 this 指向 window

# 生命周期

- 一个 vue 实例从开始创建到销毁后所经历的周期，叫做生命周期
- vue 在不同的特殊时期，自动帮你调用的函数叫做生命周期函数

## 生命周期函数

### beforeCreate

- 此时无法通过 vm 访问到 data 中的数据、methods 中的方法
- 该生命周期函数，在 vue 实例被创建前被调用

### Created

- 该函数在 vue 实例被创建好后立马被同步调用
- 此时 vue 实例已经创建完毕,数据监测、数据代理已经完成。
- 可以通过 vm 访问到 data 中的数据、methods 中配置好的方法

### beforeMount

- 该函数在这阶段，vue 已经解析好模板，已经生成了虚拟 DOM，准备将虚拟 DOM 转化为真实 DOM 后进行挂载。
- 页面呈现的是未经 vue 编译 DOM 结构
- 所有对 DOM 的操作，最终都不奏效

### Mounted

- 实例被挂载完成后调用，这时 `el` 被新创建的 `vm.$el` 替换了。
- 页面中呈现的是经过 vue 编译的 DOM。
- 此时对 DOM 的操作均能生效，但应尽可能避免操作 DOM。
- 至此初始化过程结束，一般在此处进行：开启定时器，发送网络请求、订阅消息、绑定自定义事件、等初始化操作

### beforeUpdate

- 在数据发生改变后，DOM 被更新之前被调用
- 此时数据是新的，但页面是旧的(拿到了更新后的数据，准备重新解析模板更新页面，但还没开始)
- 页面尚未和数据保持同步

### updated

- 在数据更改导致的虚拟 DOM 重新渲染和更新完毕之后被调用。
- 此时模板已经重新解析完成，虚拟 DOM 已经转化为真实 DOM，页面已经更新完毕。
- 此时数据是新的，页面也是新的，即页面和数据保持同步

### beforeDestory

- 在 vue 实例被销毁前被调用，在这一步还能使用实例
- vm(vue 实例)中的 data、methods、指令等等，都处于可用状态，马上要执行销毁流程
- 一般在此阶段执行关闭定时器、取消订阅消息、解绑自定义事件等收尾操作
- 对数据的修改不会触发更新

### destroyed

- 在 vue 实例被完全销毁后调用。
- 执行到该步骤后，会解绑 vue 实例中的所有指令，移除所有的自定义事件监听器(原生事件监听还能奏效)，所有的子实例(子组件)也被销毁

# vue-cli(脚手架)

[官方文档](https://cli.vuejs.org/zh/)

- vue 脚手架是 vue 官方提供的标准化开发工具(官方现在更推荐使用 vite)

## 安装 vue 脚手架

> 安装之前确保电脑已经装了 nodejs 的环境

1. 下载前建议先配置 npm 淘宝镜像:**npm config set registry https://registry.npm.taobao.org**(防止下载速度过慢)
2. 全局安装 vue 脚手架:**npm install -g @vue/cli**(只需执行一次即可)
3. 选择自己想要创建项目的目录打开从 cmd 窗口，使用命令快速创建项目:**vue create 项目名称**
4. 在 cmd 窗口使用 cd 命令，进入项目文件。运行:**npm run serve**即可将项目运行起来。
5. 在当前 cmd 窗口按下 Ctrl+c 即可结束项目

## vue 脚手架结构

### 杂乱文件

- .gitignore:git 的忽略文件，在里面配置那些文件不受 git 的管理

- babel.config.js:babel 的配置文件。(不用碰)

- jsconfig.json:目录中存在 jsconfig.json 文件表示该目录是 JavaScript 项目的根目录。
  jsconfig.json 文件指定根文件和 JavaScript 语言服务提供的功能选项。

- package.json:用来管理和记录下载的包的文件

- package-lock.json:包的版本控制文件

- README.md:项目的说明文件(markdown 格式文件，常用于写笔记或说明文档)

- vue.config.js:脚手架的配置文件(建议在这关闭 eslint 的语法检查)

### node_modules

- 存放项目所依赖的包的文件夹

### src

- 存放项目主体的文件的夹
- src 中的 main.js 文件:整个项目的入口文件
- src 中的 assets 用于存放静态资源文件
- src 中的 components 用于存放所有组件文件(App.vue 除外)

## render 函数

```js
  render(createElement){
    return createElement('h1','helloWorld')
  }

  //简写形式,形参可以任意该变
  render:createElement => createElement('h1','helloWorld');
```

- 该函数由 vue 自己调用,调用该函数时,会传入一个函数(createElement,通过该函数可以创建具体的元素)

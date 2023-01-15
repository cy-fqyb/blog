---
title: vue3的响应式原理
date: 2022-11-21 13:25:21
permalink: /pages/3d39ff/
categories:
  - notes
  - vue
tags:
  -
---

# Vue3 响应式原理

## 基础数据类型的响应式

- 借助`Object.defineProperty()`来对数据进行数据劫持，进而实现数据的响应式。
- vue2 的响应式原理也是基于`Object.defineProperty()`中的`get`和`set`方法。

## 对象数据类型的数据的响应式

- 借助 window 的内置对象`Proxy`来实现的响应式
- `Proxy`:[文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
- 借助 Proxy 对象可以创建对一个对象的代理，通过这能够拦截到对被代理对象的操作

<img src="/fqyb-blog/notesImg/vue/vue3/响应式原理.png" alt="响应式原理" style="zoom: 33%;margin-left:500px" />

- vue3 底层是借助 Proxy 和 Reflect 的组合使用来实现对对象数据的响应式
- 使用 Reflect 中的方法来操作对象中的数据，因为这样能让框架的稳定性更高，不容易崩溃。

<img src="/fqyb-blog/notesImg/vue/vue3/code.png" alt="响应式原理" style="zoom: 33%;margin-left:500px" />

- Reflect:[文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect)

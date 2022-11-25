---
title: Promise学习笔记
date: 2022-11-06 22:57:48
permalink: /pages/743af2/
categories:
  - notes
  - javaScript
tags:
  - 
---
# Promise 学习笔记

[Promise 参考文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)

## Promise 概念

- promise 是一个用来存储数据的容器
- 它拥有着一套特殊的存储数据的方式
- 这个方式使得它里边可以保存异步调用的结果

## 为什么要用 Promise

- 当使用回调函数的形式来实现异步编程时，当处理结果过多时会出现回调地狱的现象。
- Promise 就是为了解决回调地狱的问题，采用链式调用的形式，使得代码更具可读性。

## 创建 Promise

- 创建 Promise 时,构造函数中需要一个函数作为参数
- Promise 构造函数的回调函数，它会在创建 Promise 时调用，调用时会有两个参数传递进去

```js
const promise = new Promise((resolve, reject) => {
  //resolve和reject是两个函数,通过两个函数可以向Promise中存储数据
  //resolve在执行正常时存储数据,reject在执行错误时存储数据
  //resolve("枫桥夜泊");
  //通过函数来向Promise中添加数据,好处就是可以用来添加异步调用的数据
  setTimeout(() => {
    resolve("枫桥夜泊");
  }, 1000);
});
```

## 从 Promise 中读取数据

- 可以通过 Promise 实例方法`then`来读取 Promise 中存储的数据
- `then`需要两个回调函数作为参数,回调函数用来获取 Promise 中的数据
  - 通过 resolve 存储的数据会调用第一个函数返回,可以在第一个函数编写处理数据的代码。
  - 通过 reject 存储的数据或者出现异常时，会调用第二个函数返回数据，可以在第二个函数中编写处理异常的代码。
- 也可以通过`catch`来读取数据
  - catch 用法和 then 类似，但是只需要一个回调函数做为参数
  - catch 的回调函数只会在 Promise 被拒绝时被调用
  - catch 相当于 then(null,reason=>{})
  - catch 就是一个用来专门用来处理 Promise 异常的方法
- `finally`
  - 无论是正常存储数据还是出现异常了，finally 总会执行。
  - 但是 finally 的回调函数不会接收到数据
  - 通常用来编写一些无论成功与否都要执行的代码
- 这三个方法都会返回一个 promise
  - 这个 Promise 对象中会存储回调函数的返回值
  - finally 的返回值，不会存储到新的 Promise 中
  - 对 Promise 进行链式调用时，后边的方法(then 和 catch)读取的是上一步的执行结果
    如果上一步的执行结果不是当前想要的结果则跳过当前的方法
- 当 Promise 出现异常时，而整个调用链中没有 catch，则异常会向外抛出(catch 用来捕获异常)
  - 当 catch 内的代码出错，catch 自身不会处理自己的异常，而是向外抛出由后续的 catch 来处理

## Promise 原理

### Promise 中维护了两个隐藏属性:

- PromiseResult:用来存储数据
- PromiseState:用来记录 Promise 的状态(三种状态)
  - fulfilled(完成) 通过 resolve 存储数据时
  - rejected(拒绝,出错了) 出错了,或者通过 rejec 存储数据时
  - pendding(正在进行中,数据还没存储进去)
- state 只能修改一次，修改以后永远不会在再变。

### 流程

- 当 Promise 被创建时，PromiseState 初始值为 pending
- 当通过 resolve 存储数据时，PromiseState 变为 fulfilled(完成)，PromiseResult 变为存储的数据值
- 当通过 reject 存储数据或出错时，PromiseState 变为 rejected，PromiseResult 变为存储的数据值或异常对象

- 当我们通过`then`读取函数时，相当于为 Promise 设置了回调函数，
  - 如果 PromiseState 变为 fulfilled，则调用 then 的第一个回调函数来返回数据。
  - 如果 PromiseState 变为 rejected 则调用 then 的第二个回调函数来返回数据

## 静态方法

### Promise.resolve()

- 创建一个立即完成的 Promise

### Promise.reject()

- **`Promise.reject()`** 方法返回一个带有拒绝原因的 `Promise` 对象。

### Promise.all()

- 需要传递一个数组作为参数
- 也会返回一个 Promise 对象，同时返回多个 Promise 执行的结果。
- 如果其中一个 Promise 对象报错，则全部的结果都不会返回
- Promise.allSettled([...])同时返回多个 Promise 的执行结果(无论成功或失败)

```js
function Sum(a, b) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b);
    }, 1000);
  });
}

Promise.all([Sum(123, 456), Sum(5, 6), Sum(33, 44)]).then((r) => {
  console.log(r);
});
```

### Promise.race

- 同时执行多个 Promise，返回第一个执行完成的 Promise 的结果，其余的忽略。

- 谁运行的快的返回谁，不考虑对错

- Promise.any() 返回执行最快的 Promise 所有的 promise 对象都执行失败才会返回失败状态。

```js
Promise.race([
  Promise.resolve(1234),
  Sum(123, 456),
  Sum(5, 6),
  Sum(33, 44),
]).then((r) => {
  console.log(r);
});

//打印1234，因为它立即执行完成，其余的要等一秒
```

## 宏任务和微任务

- Js 是单线程的，它的运行时基于时间循环机制(event loop)
  - 调用栈:里面放的是要执行的代码(开始执行)
  - 任务队列(队列是一种数据结构，先进先出):任务队列里面放的是将要执行的代码(准备执行了)。
  - 当调用栈中的代码执行完毕后，队列中的代码才会按照顺序依次进入到栈中去执行。
- 在 JS 中存在两种任务队列
  - 宏任务队列:大部分代码都去宏任务队列中去排队
  - 微任务队列:Promise 的回调函数(then、catch、finally)去微任务队列
- JS 事件执行流程
  - 先执行调用栈中的队列
  - 再执行微任务队列中的任务
  - 最后执行宏任务队列中的任务
- 通过 queueMicrotask 方法可以向微任务队列中添加一个任务

## 检测题

```js
console.log(1);

setTimeout(() => {
  console.log(2);
});

Promise.resolve().then(() => {
  console.log(3);
});

Promise.resolve().then(() => {
  setTimeout(() => {
    console.log(4);
  });
});

Promise.resolve().then(() => {
  console.log(5);
});

setTimeout(() => {
  console.log(6);
});

console.log(7);
```

- 输出结果为 1 7 3 5 2 6 4
- 先执行调用栈里面的代码，按照顺序依次执行，所以先执行输出 1 和 7，并将 2 和 6 加入宏任务队列准备执行。
- 其次执行任务队列里面的任务按照微任务优先于宏任务的顺序所以先执行 3 个 Promise 对象的代码 按照顺序输出 3 和 5，并将 4 加入宏任务队列。
- 执行完微任务队列开始执行宏任务队列，按照进入宏任务队列的顺序 2>6>4,所以结果依次输出 2 6 4

- 所以最终结果为 1 7 3 5 2 6 4

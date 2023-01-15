---
title: Express模块笔记
data: 2022-10-3
date: 2022-10-03 17:15:31
permalink: /pages/0c4470/
categories: 
  - notes
  - nodejs
tags: 
  - 
---

# Express

[官方网站](https://www.expressjs.com.cn/)

Express 是 nodejs 的用于快速创建网站的第三方模块

## 作用

- 可以快速创建 Web 网站的服务器或 API 接口的服务器

## Express 的使用

### 基本使用

- 安装 Express

```sh
    npm install express
```

- 创建简单的服务器

```js
//导入express模块

const express = require("express");

//创服务器的实例

const app = express();

//启动服务器

app.listen(8080, (err) => {
  if (err) {
    return console.log(`服务器启动失败:${err}`);
  }
  console.log("服务器启动成功，运行在:http://127.0.0.1:8080");
});
```

### 监听客户端请求

- 监听 GET 请求
  通过 app.get()方法，可以监听客户端的 GET 请求，具体的语法格式如下

  ```js
  app.get("请求url", (req, res) => {
    //请求事件处理函数;
  });

  /*
        第一个参数是:用户的请求的地址
        第二个参数是一个回调函数
            req:请求的对象(包含与请求相关的属性和方法)
            res:响应的对象(包含与响应相关的属性和方法)
  */
  ```

### 将内容发送给客户端

- 通过 res.send()实现将处理好的内容传送给客户端

- 通过 req.query 对象，可以访问到客户端通过查询字符串的形式，发送到服务器的参数
  1.req.query 默认是一个空对象  
  2.客户端使用:?name=zs&age=20 这种查询字符串的形式，发送到服务器的参数  
  3.通过这种方式传递的参数可以通过 req.query 访问到

```js
app.get("/", (req, res) => {
  console.log(req.url);
  console.log(req.method);
  //通过res.send()方法将处理好的内容发送给客户端
  res.send({
    name: "张三",
    age: 18,
  });
});
```

- 通过通过 req.params 对象，可以访问到 URL 中，通过 : 匹配到的动态参数：

```js
app.get("/user/:id", (req, res) => {
  console.log(req.params);
});
```

### 托管静态资源

- 通过使用==express.static()==方法可创建静态资源服务器，向外开放访问静态资源。

- Express 在指定的静态目录中查找文件，并对外提供资源的访问路径，存放静态文件的目录名不会出现在 URL 中。

- 可以指定多个静态资源文件，可以通过多次调用该方法指定多个静态资源文件夹

- 访问静态资源时，会根据托管顺序查找文件

- 当有多个静态资源文件时，可以给静态资源添加访问前缀

```js
app.use("/bruce", express.static("bruce"));
```

## Express 路由

### 概念

- 在 Express 中，路由指的是客户端的请求与服务器处理函数之间的映射关系。

- 一组请求路径和处理函数和请求方式所组成的对应关系就能称为路由

### 实现过程

- 每当一个请求到达服务器之后，需要先经过路由的匹配，只有匹配成功之后，才会调用对应的处理函数。

- 在匹配时，会按照路由的顺序进行匹配，如果请求类型和请求的 URL 同时匹配成功，则 Express 会将这次请求，转交给对应的 function 函数进行处理。

### 模块化路由

- 最简单的路由使用方式就是直接把所有路由挂载到服务器实例中(Express 不推荐这样做)

- 推荐做法:将所有路由抽离出来组合成一个路由模块，这样方便使用和维护，抽离步骤如下所示:
  ① 创建路由模块对应的 .js 文件
  ② 调用 express.Router() 函数创建路由对象
  ③ 向路由对象上挂载具体的路由
  ④ 使用 module.exports 向外共享路由对象
  ⑤ 使用 app.use() 函数注册路由模块

```js
//router.js
//创建路由模块

//导入Express模块
const express = require("express");

//调用express.Router()创建路由实例对象(或者可以叫路由器)
const router = express.Router();

//创建具体路由并将它挂载到路由对象上
router.get("/", (req, res) => {
  res.send({
    name: "张三",
    age: 18,
    result: "路由已被调用",
  });
});

router.post("/", (req, res) => {
  res.send(`路由已被调用，调用方式为:${req.method}`);
});
module.exports = router;
```

```js
//导入Express模块

const express = require("express");

//导入路由模块

const router = require("./router");

//创建服务器实例

const app = express();

//使用app.use()方法注册路由模块

app.use(router);

//启动服务器

app.listen(8080, (err) => {
  if (err) {
    return console.log(`服务器启动失败:${err}`);
  }
  console.log("服务器启动成功，运行在:http://localhost:8080/");
});
```

## Express 中间件

- 类似于 Vue 的全局路由守卫，或拦截器。

### 概念

- 中间件（Middleware ），特指业务流程的中间处理环节

- Express 的中间件，本质上就是一个 function 处理函数，包含 req, res, next 三个参数，next() 参数把流转关系交给下一个中间件或路由

- 中间即将事件的处理拆分出多个函数来进行(这些处理事件的多个函数可以称为中间件)

- 服务器收到客户端的请求后，可以调用中间件进行预处理

### next()函数

- next 函数是实现多个中间件连续调用的关键，它表示把处理好的数据交给下一个中间件或路由

- next()函数后面不要再写代码

### 注意事项

- 在注册路由之前注册中间件（错误级别中间件除外）

- 中间件可以调用多个

- 多个中间件共享 req、res 对象

### 全局中间件

- 概念:客户端发起的任何请求，到达服务器之后，都会触发的中间件，叫做全局生效的中间件。

- 通过调用 app.use(中间件函数)，即可定义一个全局生效的中间件。

```js
const express = require("express");
const app = express();
const router = require("./router");
//定义一个简单的中间件函数

const mw = function (req, res, next) {
  console.log("这是一个中间件函数");

  //调用next函数，将流转函数转交给下一个中间件或路由
  next();
};

//使用app.use()将mw中间件注册为全局变量中间件
app.use(mw);

//注册路由模块
app.use(router);

//启动服务器
app.listen(8080, (err) => {
  if (err) {
    return console.log(`服务器启动失败:${err}`);
  }
  console.log("服务器启动成功，运行在:http://localhost:8080/");
});
```

- 定义全局中间件的简化形式

```js
//全局中间件

app.use((req, res, next) => {
  console.log("这是一个简化形式定义的全局中间件");
  next();
});
```

- 定义多个全局中间件(多次调用 app.use()方法来实现)

```js
const express = require("express");
const app = express();

//定义第一个全局中间件
app.use((req, res, next) => {
  console.log("这是第一个全局中间件");
  next();
});

//定义第二个全局中间件
app.use((req, res, next) => {
  console.log("这是第二个全局中间件");
  next();
});

//定义第三个全局中间件
app.use((req, res, next) => {
  console.log("这是第一个全局中间件");
  next();
});
```

- 当有多个全局中间件时，会按照定义的顺序来依次调用

### 局部中间件

- 概念:不使用 app.use()定义的中间件就叫局部中间件

```js
//定义局部中间件函数
let mw1 = (req, res, next) => {
  console.log("调用了mw1局部中间件");
  next();
};

let mw2 = (req, res, next) => {
  res.send("用户");
  next();
};

//创建路由
app.get("/", mw1, (req, res) => {
  res.send("首页");
});

app.get("/user", mw2, (req, res) => {
  console.log("mw2局部中间件被调用了");
});
```

- 创建并调用多个局部中间件

```js
//创建两个局部中间件
let mw1 = (req, res, next) => {
  console.log("调用了mw1局部中间件");
  next();
};

let mw2 = (req, res, next) => {
  res.send("用户");
  next();
};

//创建路由并调用多个局部中间件
app.get("/", mw1, mw2, (req, res) => {
  res.send("首页");
});

app.get("/", [mw1, mw2], (req, res) => {
  res.send("首页");
});

//以上两种调用多个中间件的写法效果是相同的，任意选择一种就行
```

### 中间件的分类

1.应用级别的中间件
通过 app.use() 或 app.get() 或 app.post() ，绑定到 app 实例上的中间件，叫做应用级别的中间件。

```js
app.use((req, res, next) => {
  next();
});

app.get(
  "/",
  (req, res, next) => {
    next();
  },
  (req, res) => {
    res.send("局部中间件");
  }
);
```

2.路由级别的中间件
绑定到路由实例上的中间件，叫做路由级别的中间件。它的用法和应用级别中间件没有任何区别。只不过，应用级别中间件是绑定到 app 实例上，路由级别中间件绑定到 router 实例上。

```js
const express = require("express");
const app = express();
const router = express.Router(); //创建路由实例对象

//路由级别的中间件
router.use((req, res, next) => {
  next();
});

app.use(router);
```

3.错误级别的中间件

- 处理函数拥有四个形参，从前到后依次是(err,req,res,next)，且位于所有路由的后面，这样的中间件叫错误级别的中间件

- 作用:专门用来捕获整个项目中发生的异常错误，从而防止项目异常崩溃的问题。

```js
//导入Express模块
const express = require("express");

//创建服务器实例
const app = express();

//创建一个路由
app.get("/", (req, res) => {
  throw new Error("模拟浏览器抛出异常"); //抛出一个自定义的错误
  res.send("这是网页首页");
});

//创建错误中间件
app.use((err, req, res, next) => {
  console.log(`发生了错误:${err.message}`);
  res.send(`Error:${err.message}`); //将错误信息返回客户端
});

//启动服务器
app.listen(8080, (err) => {
  if (err) {
    return console.log(`服务器启动失败:${err}`);
  }
  console.log("服务器启动成功，运行在:http://localhost:8080/");
});
```

4.内置中间件

- express.static 快速托管静态资源的内置中间件，例如： HTML 文件、图片、CSS 样式等（无兼容性）

- express.json 解析 JSON 格式的请求体数据（有兼容性，仅在 4.16.0+ 版本中可用）

- express.urlencoded 解析 URL-encoded 格式的请求体数据（有兼容性，仅在 4.16.0+ 版本中可用）

```js
//导入Express模块
const express = require("express");

//创建服务器实例
const app = express();

//注册express.json中间件
//解析客户端发来的json格式的数据
app.use(express.json());

//注册使用express.urlencoded
//解析客户端发来的xx-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

//创建路由
app.get("/", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

//启动服务器
app.listen(8080, (err) => {
  if (err) {
    return console.log(`服务器启动失败:${err}`);
  }
  console.log("服务器启动成功，运行在:http://localhost:8080/");
});
```

5.第三方中间件

- 由第三方开发出来的中间件

- 下载好第三方中间件后，通过 require 引入中间件，最后通过 app.use()来注册中间件

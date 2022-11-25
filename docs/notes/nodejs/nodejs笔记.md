---
title: nodejs笔记
date: 2022-10-03 00:00:00
categories: 
  - notes
  - nodejs
permalink: /pages/66138d/
tags: 
  - 
---

# 学习笔记

# fs 文件系统模块

> 是 nodejs 给用户提供的用于对文件操作的 API

## 导入 fs 文件系统模块的导入

[import 导入文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/import)

```js
const fs = require("fs"); //引入fs文件系统模块
//似乎暂时不支持es6的导包模式
```

## fs 读取

### fs.readFile()

    用法:fs.readFile('读取文件的路径','读取文件时的编码格式（不写的话默认utf-8）',读取成功时要执行的回调函数)
    
    ```js
    fs.readFile('./test.txt','utf-8',(err,datatxt)=>{
    if(err){
        console.log('读取失败错误信息为:',err);
    }
    console.log('读取成功！')
    console.log(datatxt);
    
    })
    //在执行回调函数时会传入两个值，一个是用来接收错误信息的，一个是用来接收读取到的内容，当读取成功时，错位值为null
    //可借此来判断是否读取成功
    ```

## 写入

### fs.writeFile()

    用法:fs.writeFile('path','x',function)
    path:用来指定写入文件的路径
    x:用来指定编码格式
    function:指定写入成功后调用的回调函数

```js
fs.writeFile(
  "./input.txt",
  `
    writeFile写入数据会覆盖原数据，
    当指定的路径上，要执行写入操作的文件不存在时，
    会自动在该路径创建该文件后执行写入操作。
`,
  (err) => {
    if (err) {
      return console.error(err);
    }
    console.log("数据写入成功！");
  }
);
```

## fs 路径动态拼接错误

    当使用相对路径时如使用"../fs 文件系统模块/"等，容易出现路径 动态拼接错误
    
    解决方法:
    1.使用绝对路径如“D:\人机交互\Javascript\nodeJs\fs文件系统模块\README.md”(缺点:可移植性差)
    
    2.使用nodejs提供的(__dirname)来解决问题

# path 路径模块

> path 路径模块是 nodejs 提供的解决路径问题的 API

## 导入 path 路径模块

```js
const path = require("path");
```

## path.join()

- 作用:实现将多个路径进行拼接,并且将得到的值返回。
- 语法:path.join('路径 1','路径 2',.....)
- 注意:在路径中有'../'会抵消掉一层路径，会造成向上翻一层路径。

```js
const path = require("path");

//使用path.join()实现路径的拼接

const pathStr = path.join(__dirname, "./path-join.js");

//__dirname表示当前文件所在的目录，将二者进行拼接后返回

console.log(pathStr);

//输出的结果为:D:\人机交互\Javascript\nodeJs\path路径模块\path-join.js

const pathStr = path.join(__dirname, "../path-join.js");

//这样输出的结果就是:D:\人机交互\Javascript\nodeJs\path-join.js
```

## path.basename()

- 作用:掉用该函数时，可以出入两个参数，一个是路径，一个可以是文件名的后缀名,调用该函数后，会把指定路径的最后一部分返回,如果传入了最后一部分的后缀名，将会把最后一部分路径的后缀名取出后返回。

- 语法:path.basename('路径',后缀名(可不写));

```js
const path = require("path"); //传入模块

const pathtest = path.basename("/Javascript/16-数组/数组.md");

console.log(pathtest);

//输出的结果是:数组.md

const pathtest = path.basename("/Javascript/16-数组/数组.md", ".md");

//出入第二个参数时输出的结果为:数组。
```

## path.extname()

- 作用:获取指定路径的拓展名后返回

```js
console.log(path.extname("/Javascript/16-数组/数组.md"));

//输出拓展名:.md
```

# http 模块

> http 模块是 Node.js 官方提供的、用来创建 web 服务器的模块

## 运用 http 模块创建简单服务器

```js
//导入http模块
const http = require("http");

//创建web服务器实例
const serve = http.createServer();

//为服务器实例绑定request事件，监听客户端的请求
serve.on("request", (req, res) => {
  console.log("有人向服务器发送了请求");
  console.log(`请求方式是:${req.method},请求地址是:${req.url}`);
  let str = `你请求方式是:${req.method},你请求地址是:${req.url}`;

  //调用res.setHeader()方法，设置Content-Type 响应头，解决中文乱码问题
  res.setHeader("Content-Type", "text/html; charset=utf-8");

  res.end(str); //将内容响应给客户端
});

//启动服务器
serve.listen(8080, () => {
  console.log("服务器启动成功，运行在:http://127.0.0.1:8080");
});
```

### req 请求对象

- req 是为服务器绑定 request 事件中回调函数传入的一个参数
- 当服务器接收到了客户端的请求，就会调用回调函数
- req 是一个对象，它包含了和客户端有关的数据和属性，如
  req.url 是客户端请求的 url 地址(从端口号后面开始的部分)
  req.methods 是客户端的 methods 请求类型。(像 GET 请求，POST 请求)

### res 对象

- 可以通过 res.end()方法可以向客户端发送东西

- 调用 res.setHeader()方法，设置 Content-Type 响应头，解决中文乱码问题

## 简陋的路由效果

```js
const http = require("http"); //导入http模块

const serve = http.createServer(); //创建服务器实例

serve.on("request", (req, res) => {
  //接收用户请求的地址
  const url = req.url;

  let endContent = "<h1>404 Not Found</h1>";

  if ((url === "/") | (url === "/index.html")) {
    endContent = "<h1>首页</h1>";
  } else if (url === "/about.html") {
    endContent = "<h1>关于我们</h1>";
  }
  //设置响应头，防止中文乱码

  res.setHeader("Content-Type", "text/html; charset=utf-8");

  //使用res.end()把内容响应给客户端
  res.end(endContent);
});

//在某端口开启服务器
serve.listen(80, () => {
  console.log("服务器启动成功，运行在:http://127.0.0.1");
});
```

## 使用 http 模块将时钟案例传递给客户端

```js
//导入需要的模块
const http = require("http");

const fs = require("fs");

const path = require("path");

//创建服务器实例
const serve = http.createServer();

//绑定request事件，监听请求
serve.on("request", (req, res) => {
  //获取请求的地址,并且将其映射为具体文件的存放地址
  //const url = path.join(__dirname,req.url);

  // 请求路径优化
  const url = req.url;

  let fspath = "";
  if (url === "/") {
    fspath = path.join(__dirname, "./clock/index.html");
  } else {
    fspath = path.join(__dirname, "./clock", url);
  }
  //读取文件的内容，并且将读取好好的内容传递给客户端

  fs.readFile(fspath, "utf-8", (err, datatext) => {
    //判断文件是否读取成功，如果失败则向客户端放回404，
    //如果成功则将读取成功的数据传递给客户端
    if (err) {
      return res.end("<h1>404 Not Found</h1>");
    } else {
      res.end(datatext);
    }
  });
});

//启动服务器

serve.listen(8080, () => {
  console.log("服务器启动成功，运行在:http://127.0.0.1:8080");
});
```

# 模块化

## 模块化的基本概念

- 模块化是指解决一个复杂问题时，自顶向下逐层把系统划分成若干模块的过程。对于整个系统来说，模块是可组合、分解和更换的单元

- 编程领域中的模块化，就是遵守固定的规则，把一个大文件拆成独立并互相依赖的多个小模块

- 模块化的好处:  
  1.提高代码的复用性  
  2.提高代码的可维护性  
  3.可以实现按需加载

- 模块化规范，就是指对代码进行模块化拆分和组合时需要遵守的规则，如使用何种语法格式引用模块和向外暴露成员。
  好处:降低了沟通成本，方便了各个模块之间的相互调用

## Node.js 中的模块分类

- 内置模块:（内置模块是由 Node.js 官方提供的，例如 fs、path、http 等）
- 自定义模块:（用户创建的每个 .js 文件，都是自定义模块）
- 第三方模块:（由第三方开发出来的模块，并非官方提供的内置模块，也不是用户创建的自定义模块，使用前需要先下载）

## 加载模块

- 使用 require 方法来加载模块
- 使用 require 方法加载模块时会自动帮我们补齐路径的后缀名

## Node.js 中的模块作用域

- 和函数作用域相似，在自定义模块中定义的变量、方法等成员，只能在当前模块内被访问，这种模块级别的访问限制，叫做模块作用域

- 模块作用域的好处:防止全局变量被污染

## module 对象

- 在每个.js 自定义模块中都有一个 module 对象，它里面存储了和当前模块有关的信息

### module.exports 对象

- 在自定义模块中，可以使用 module.exports 对象，将模块内的成员共享出去，供外界使用。
  导入自定义模块时，得到的就是 module.exports 指向的对象。

- 使用 require()方法导入模块时，导入的模块的结果，永远以 module.exports 指向的对象为准。

- 默认情况下，exports 和 module.exports 指向同一个对象。最终共享的结果，以 module.exports 指向的对象为准。

## CommonJS 模块化规范

- 在每个模块的内部，module 变量代表当前模块。

- module 是一个对象，module.exports 是对外的一个 API 接口

- 加载模块即使加载模块中的 module.exports 对象

## 模块加载机制

模块第一次加载后会被缓存，即多次调用 require() 不会导致模块的代码被执行多次，提高模块加载效率。

### 内置模块的加载

- 内置模块的加载优先级最高

### 自定义模块加载

- 加载自定义模块时，模块的路径要使用./或者../开头，否则会被当成内置模块或第三方模块。

- 在导入自定义模块时，路径的拓展名可以不写，因为系统会自动补齐，补齐规则如下。
  - 补齐.js 后尝试加载
  - 补齐.json 后尝试加载
  - 补齐.node 后尝试加载
  - 若以上拓展名都无法找到文件，则直接报错

### 第三方模块加载

- 在导入第三方模块时，Node.js 会从/node_modules 文件夹中加载第三方模块。(当使用 npm 包管理工具下载第三方包时，会自动将下好的包放到/node_modules 文件夹中)

- 如果没有找到对应的第三方模块，则移动到再上一层父目录中，进行加载，直到文件系统的根目录。

### 将目录作为模块进行加载

- 在被加载的目录下查找 package.json 的文件，并寻找 main 属性，作为 require() 加载的入口

- 如果没有 package.json 文件，或者 main 入口不存在或无法解析，则 Node.js 将会试图加载目录下的 index.js 文件。

- 以上不行则会报错

## npm 与包

### 包的概念

- Nodejs 中的第三方模块又叫做包

- 就像电脑和计算机指的是相同的东西，第三方模块和包指的是同一个概念，只不过叫法不同

### 包的来源

- 包是由第三方个人或团队开发出来的，免费供所有人使用。

### 包的益处

- 由于 Node.js 的内置模块仅提供了一些底层的 API，导致在基于内置模块进行项目开发的时，效率很低。

- 包是基于内置模块封装出来的，提供了更高级、更方便的 API，极大的提高了开发效率。

### 包的下载

- 使用 npm 包管理工具下载包

```
npm install 包的名称//完整写法

npm i 包的名称
```

- 使用 npm 包管理工具下好包后，在项目文件夹下多一个叫做 node_modules 的文件夹和 package-lock.json 的配置文件。
  node_modules 文件夹用来存放所有已安装到项目中的包。require() 导入第三方包时，就是从这个目录中查找并加载包。

  package-lock.json 配置文件用来记录 node_modules 目录下的每一个包的下载信息，例如包的名字、版本号、下载地址等。

## 包的配置文件

### package.json

- 是包管理的配置文件
- 使用命令:npm init -y 可以快速创建该文件(现在在下了包后 npm 会自动创建该文件)

# CORS 跨域资源共享

## 什么是跨域

- 跨域即跨网页获取资源或发送请求，由于浏览器的同源策略，不允许跨域访问，是浏览器对 javascript 施加的安全限制。

- 同源策略即:请求 url 的协议、域名、端口都要相同,如果其中有一个不同就是跨域

## 解决跨域问题的方式

- JSONP(存在缺点即:只能支持 GET 请求)

- CORS(Cross-Origin Resource Sharing，跨域资源共享)
  是目前的主流解决方案

## 使用 CORS 中间件解决跨域问题

- 安装与使用步骤如下  
  1.运行**npm install cors**命令安装 cors 中间件  
  2.使用 require 命令导入中间件  
  3.在注册路由之前调用 app.use()方法将其注册为全局中间件

## 什么是 CORS

- CORS 由一系列 HTTP 响应头组成，这些 HTTP 响应头决定浏览器是否阻止前端 JS 代码跨域获取资源。

- 浏览器的同源策略默认会阻止网页“跨域”获取资源。但如果接口服务器配置了 CORS 相关的 HTTP 响应头，就可以解除浏览器端的跨域访问限制

- 注意项:CORS 具有兼容性。只有支持 XMLHttpRequest Level2 的浏览器，才能正常访问开启了 CORS 的服务端接口（例如：IE10+、Chrome4+、FireFox3.5+）

## CORS 响应头

### Access-Control-Allow-Orign

- orign 参数的值指定了允许外来访问资源的 URL

```js
//只允许来自:http://locallhost:8080的请求

res.setHeader("Access-Control-Allow-Orign", "http://locallhost:8080");

//表示允许所有外来请求
res.setHeader("Access-Control-Allow-Orign", "*");
```

### Access-Control-Allow-Headers

- 默认情况下，CORS 仅支持客户端向服务器发送如下的 9 个请求头:Accept、Accept-Language、Content-Language、DPR、Downlink、Save-Data、Viewport-Width、Width 、Content-Type （值仅限于 text/plain、multipart/form-data、application/x-www-form-urlencoded 三者之一）

- 如果客户端向服务器发送了而外的请求头信息，则需要在服务器端通过 Access-Control-Allow-Headers 对额外的请求头进行声明。

```js
res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-Custom-Header");
```

### Access-Control-Allow-Methods

- 默认情况下,CORS 仅支持客户端发送 GET,POST,HEAD 请求

- 如果客户端需要发送其它的请求,则需要在服务器,通过 Access-Control-Allow-Methods 来指明实际请求所允许使用的 http 方法

## CORS 请求的分类

### 简单请求

同时满足以下两大条件的请求，则属于简单请求:

- 请求的方式为 GET、POST、HEAD 的三者之一

- HTTP 头部信息不超过以下几种字段：无自定义头部字段、Accept、Accept-Language、Content-Language、DPR、Downlink、Save-Data、Viewport-Width、Width 、Content-Type（只有三个值 application/x-www-form、urlencoded、multipart/form-data、text/plain

### 预检请求

简单的理解:预检请求就是简单请求之外的请求

- 请求的方式:GET、POST、HEAD 之外的请求 Method 类型

- 请求头中包含自定义头部字段

- 向服务器发送了 application/json 格式的数据

在浏览器与服务器正式通信之前，浏览器会先发送 OPTION 请求进行预检，以获知服务器是否允许该实际请求，所以这一次的 OPTION 请求称为“预检请求”。服务器成功响应预检请求后，才会发送真正的请求，并且携带真实数据

# 前后端身份认证

- 身份认证概念:身份认证又称身份鉴权，是通过一定的手段完成对用户的身份确认
- 身份认证的目的:确认当前用户的身份的真实性
- 身份认证方案：
  - 服务端渲染开发模式:Session认证机制
  - 前后端分离开发模式:JWT认证机制

## Session认证机制

### HTTP协议的无状态性

- 指的是客户端的每次http请求都是独立的,连续多个请求之间没有直接的关系,服务器不会主动保留每次http请求的状态
- 如何突破http无状态的限制:使用cookie
- 什么是cookie:
  - cookie是存储在用户浏览器中的一段不超过4kb的字符串。它由一个名称,一个值和其它几个用于控制cookie有效、安全性、使用范围的可选属性组成。
  - 不同域名下的cookie互相独立,每到客户端发起请求时,会自动把当前域名下的所有cookie一同发送到服务器
  - cookie的特性:
    - 自动发送
    - 域名独立
    - 过期时限
    - 4kb限制

## JWT身份认证机制

- 什么是JWT:JWT(全称是:JSON Web Token),是目前最流行的跨域解决方案

### JWT工作原理



​				

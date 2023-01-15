---
title: webpack
date: 2022-11-30 00:10:43
permalink: /pages/a1cd3b/
categories:
  - notes
  - vue
tags:
  -
---

# webpack

> 前端项目中的构建工具，简单了解会用就行。

## 使用构建工具的原因

- 当我们习惯了在 node 中编写代码的方式后，在回到前端编写 html、css、js 这些东西会感觉到各种的不便。比如：不能放心的使用模块化规范（浏览器兼容性问题）、即使可以使用模块化规范也会面临模块过多时的加载问题。
- 我们就迫切的希望有一款工具可以对代码进行打包，将多个模块打包成一个文件。这样一来即解决了兼容性问题，又解决了模块过多的问题。
- 构建工具就起到这样一个作用，通过构建工具可以将使用 ESM 规范编写的代码转换为旧的 JS 语法，这样可以使得所有的浏览器都可以支持代码。

## webpack 的使用

- 使用步骤
  1. `yarn init -y`来初始化项目(使用了 yarn 作为包管理工具)
  2. 安装依赖`webpack`、`webpack-cli`
  3. 在项目中创建`src`目录，然后编写代码（index.js）
  4. 执行`yarn webpack`来对代码进行打包（打包后的文件默认在生成的 dist 文件夹中）
- 注意点
  1. 使用`yarn webpack`命令来执行 webpack 来进行打包
  2. 可以在`package.json`文件中可以设置快捷命令
  3. `webpack.config.js`是 webpack 的配置文件

## webpack 的配置

### entry 和 output

```js
const path = require("path");
module.exports = {
  mode: "production", //设置webpack的工作模式
  entry: "./js/demo.js", //设置webpack的入口文件，一般不用
  output: {
    path: path.resolve(__dirname, "js"), //用来设置打包后的文件的输出路径，必需要绝对路径
    filename: "app.js", //指定打包后的名字
    clean: true, //自动清理打包目录
  },
};
```

### loader

- webpack 默认只能处理 js 文件，为了能否处理其他类型的文件如 css 就需要使用 loader
- loader 相当于文件的预处理器，当引入其他类型文件时，可以先使用 loader 编译，然后再引用

```js
const path = require("path");
module.exports = {
  mode: "production",
  output: {
    path: path.resolve(__dirname, "js"),
    filename: "app.js",
  },
  module: {
    rules: [
      {
        //使用css-loader使得可以在js中引入css文件，能将css转化为js
        test: /\.css$/, //表示对何种形式的文件使用loader
        use: "css-loader", //表示处理这种文件时使用那个loader
      },
    ],
  },
};
```

- loader 的迷惑点:即一个 loader 只负责干一件事，例如`css-loader`只负责将 css 转化为 js 如果想要样式生效就还要使用`style-loader`才能让样式生效。(逆天)

```js
const path = require("path");
module.exports = {
  mode: "production",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "app.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
        //注意，数组后面的loader先执行，即css-loader先于style-loader执行，脑血栓设计。
      },
      {
        test: /\.(jpg|png|gif)$/,
        type: "asset/resource",
        //图片直接类型的数据，可以通过指定type来处理无需使用loader，因为不用进行编译直接打包就行
      },
    ],
  },
};
```

## babel

- 在编写 js 代码时，经常需要使用一些 js 中的新特性，而新特性在旧的浏览器中兼容性并不好。此时就导致我们无法使用一些新的特性。(IE 好似)
- 但是我们现在希望能够使用新的特性，我们可以采用折中的方案。依然使用新特性编写代码，但是代码编写完成时我们可以通过一些工具将新代码转换为旧代码。
- babel 就是这样一个工具，可以将新的 js 语法转换为旧的 js，以提高代码的兼容性。
- 我们如果希望在 webpack 支持 babel，则需要向 webpack 中引入 babel 的 loader

### babel 的使用

1. 安装:`npm install -D babel-loader @babel/core @babel/preset-env`

2. 配置 babel:

   ```js
   module: {
     rules: [
       {
         test: /\.m?js$/,
         exclude: /(node_modules|bower_components)/,
         use: {
           loader: "babel-loader",
           options: {
             presets: ["@babel/preset-env"],
           },
         },
       },
     ];
   }
   ```

3. 在 package.json 中设置兼容列表

   ```js
   "browserslist": [
           "defaults"
    ]
   ```

   [https://github.com/browserslist/browserslist](https://gitee.com/link?target=https%3A%2F%2Fgithub.com%2Fbrowserslist%2Fbrowserslist)

## 插件(plugin)

- 插件是用来为 webpack 拓展功能的

- `html-webpack-plugin`:用来自动生成 html 页面

- 如何使用:

  - 安装插件:`yarn add -D html-webpack-plugin`

  - 配置插件:

    ```js
    const path = require("path");
    const HtmlPlugin = require("html-webpack-plugin");
    module.exports = {
      plugins: [
        new HtmlPlugin({
          template: "./src/index.html",
        }),
      ],
    };
    ```

## 开发服务器(webpack-dev-server)

- 安装服务器:`yarn add -D webpack-dev-server`
- 启动服务器:`yarn webpack serve --open`加上`--open`表示服务器准备完毕后，自动在浏览器中打开

# Vite

> [Vite | 下一代的前端工具链](https://cn.vitejs.dev/)

- Vite 也是前端的构建工具
- 相较于 webpack，vite 采用了不同的运行方式：
  - 开发时，并不对代码打包，而是直接采用 ESM 的方式来运行项目
  - 在项目部署时，在对项目进行打包
- 除了速度外，vite 使用起来也更加方便

- 基本使用：

  1. 安装开发依赖 vite

  2. vite 的源码目录就是项目根目录

  3. 开发命令：

     vite 启动开发服务器

     vite build 打包代码

     vite preview 预览打包后代码

- 使用命令构建

  ```
  npm create vite@latest
  yarn create vite
  pnpm create vite
  ```

- 配置文件：`vite.config.js`

- 格式：

  ```
  import { defineConfig } from "vite"
  import legacy from "@vitejs/plugin-legacy"

  export default defineConfig({
      plugins: [
          legacy({
              targets: ["defaults"]
          })
      ]
  })
  ```

  <Vssue/>

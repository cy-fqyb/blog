---
title: Net复习
date: 2023-01-05 23:16:25
permalink: /pages/e74d45/
categories:
  - notes
  - net
tags:
  - 
---
# ASP.Net复习

## 1.ASP.Net的运行原理

### CS架构

- 即客户端服务器架构
- 优点:
  - 交互性强
  - 拥有安全的存储形式
  - 响应速度快，利于处置大量数据
- 缺点:
  - 维护和管理难度较大
  - 用户群固定，局限于小型局域网
  - 分布功能弱，且兼容性查

### BS架构

- 即浏览器服务器架构
- 优点:
  - 分布性强，客户端零维护
  - 业务拓展便利
  - 维护和开发简单
- 缺点:
  - 功能弱化
  - 个性化特征明显减少
  - 跨浏览器不尽人意

### ASPX页面生命周期

- 页请求=>开始=>页面初始化=>加载=>验证=>呈现=>卸载

<img src="https://s1.vika.cn/space/2023/01/05/368f71fc3bfa4c1eab28b1623b7e3f24" alt="image-20230105231713971" style="zoom:50%;" />

## 2.ASP.Net内置对象

![image-20230105231853932](https://s1.vika.cn/space/2023/01/05/7d41e1cff1a946fea8921b8464bc7b1b)

### Application和Session对象的区别

- 每个客户都有自己的Session对象，而所有用户共用一个Application对象
- 有效时间不同,Session对象关闭页面就会失效被销毁，而Application只有在重启服务器的情况下才会失效
- 信息量不同，session数据较小且数据简单，而Applicants可以任意大小

### cookie 和session 的区别
（1）cookie数据存放在客户的浏览器上，session数据放在服务器上。
（2）cookie不是很安全，别人可以分析存放在本地的COOKIE并进行COOKIE欺骗
考虑到安全应当使用session。
（3）session会在一定时间内保存在服务器上。当访问增多，会比较占用你服务器的性能
考虑到减轻服务器性能方面，应当使用COOKIE。
（4）单个cookie保存的数据不能超过4K，很多浏览器都限制一个站点最多保存20个cookie。

### 其它知识点

- 页面跳转:`Response.Redirect(“”)`
- 判断页面是否是初次加载:`!Page.IsPostBack`

## 3.皮肤和母版页


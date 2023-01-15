---
title: JS基础
date: 2022-10-03 21:24:46
permalink: /pages/49e168/
categories:
  - notes
  - javaScript
tags:
  - 
---
# 类的简介

## 使用 object 创建对象

- 无法区分出不同类型的对象
- 不方便批量创建对象

```js
const person = {
  name: "张三",
  age: "24",
};
```

## 运用 class 创建对象

- 类的概念:类是对象的模板，可以将对象的属性和方法直接定义在类中
  定义后就可以直接通过类来创建对象。
- 通过一个类创建的对象称为同类对象。可以使用 instanceof 来检查一个对象是否由某个类所创建。
  如果一个对象由某个类所创建，那么就将该对象称为该类的一个实例。

语法:
1.class 类名{}，类名要使用大驼峰命名。
2.const 类名=class{}

```js
class person {}
const dog = class {};
```

# 类的属性

## 实例属性

- 直接写的属性叫做实例属性，实例属性只能通过实例访问
- 类的代码块自带严格模式，且类的代码块是用来设置对象的属性
  不是什么代码都能写。

```js
class person {
  name = "张三"; //直接写的属性叫做实例属性，实例属性只能通过实例访问
  age = 15;
}
```

## 静态属性

- 使用 static 声明的属性叫做静态属性（类属性），只能通过类去访问

```js
class person {
  static name;
  static age; //使用static声明的属性叫做静态属性（类属性），只能通过类区访问
}
```

# 类的方法

## 添加方法的方式

方法分为两种:
<br> 1.实例方法:实例中的 this 指向的是当前的实例
<br>2.静态方法(类方法):通过类来调用，this 指向的是当前类，谁调用指向谁。

- 第一种

```js
class person {
  sayhello = function () {};
}
```

- 第二种

```js
class person {
  sayhello() {} //实例方法
  static hello() {} //静态方法
}
```

# 构造函数

概念:在类中可以添加一个特殊的方法 constructor,该方法被称为构造函数

:::tip
该函数会在我们调用类创建对象时，自动被调用执行
:::

- 可以在构造函数中为实例属性赋值
- 在构造函数中 this 指向当前所创建的对象

# 面向对象

> 面向对象的特点:封装、继承、多态。

## 封装

- 对象就是一个用来存储不同属性的容器
- 对象不仅要存储属性，还要负责数据的安全
- 直接添加到对象中的属性并不安全，因为它可以被任意修改
- 确保数据安全:  
  1.私有化数据:实例属性中以#开头的属性代表私有属性，私有属性只能在类的内部访问。
  <br>2.提供了 getter 和 setter 方法来开放对数据的操作，这样做带来好处有可以控制属性的读写权限
  可以在方法中对属性的值进行验证

* 封装主要用来保障数据的安全
* 实现封装的方式:  
  1.属性私有化，在属性名前加#  
  2.通过 getter 和 setter 方法来操作属性。

```js
class person {
  #age;
  #name;
  #sex; //私有属性
  /* getAge() {
          return this.#age;
        }
        setAge(age) {
          this.#age = age;
        } */

  get age() {
    return this.#age;
  }
  set age(age) {
    console.log("setter方法被调用了");
    if (age > 0) {
      this.#age = age;
    }
  }
}
const p1 = new person();
p1.age = 15; //属性的读取和设置与以往一致。
console.log(p1.age);
```

## 多态

:::tip 注意
在 JS 中，不会检查参数的类型，这意味着任何数据都可以作为参数传递。
:::

多态在 JS 中的体现为:函数参数类型的多态性，要调用某个函数无需指定类型，只要条件满足即可，多态让我们的代码编写更加灵活。

```js
class person {
  constructor(name) {
    this.name = name;
  }
}
class dog {
  constructor(name) {
    this.name = name;
  }
}
const p1 = new person("张三");
const d1 = new dog("哈士奇");
function sayhello(obj) {
  console.log(`你好${obj.name}`);
}
sayhello(p1); //传入p1对象体现了多态。
console.log(p1, d1);
```

## 原型与原型对象

- 个人理解:  
  1.原型:任意一个对象或者类它都有它的缔造者或是类似于父类的存在如一个对象是由一个类 new 出来的这个类就是它
  所创建的实例的原型  
  2.原型对象:任意一个类通过构造函数可以创建出无数个对象，但当一个类被创建时，浏览器开辟一个空间为其创建一个特殊的对象，
  这个对象有且只有一个，通过这个类所创建的每个实例对象都能访问到这个对象，这个对象就叫做这些实例的原型对象，类的实例
  通过\_\_proto\_\_属性能够访问到原型对象，而创建它们的类通过 prototype 能访问到这个原型对象。除此之外，一个类的原型对象  
  是这个类的父类的一个实例对象。

```js
class Animal {
  constructor(name) {
    this.name = name;
  }
}
class Person extends Animal {
  age = 28;
}
let p1 = new Person("张三");
console.log(p1.__proto__ === Person.prototype); //结果为true
console.log(p1.__proto__); //通过p1实例对象访问这个原型对象，而这个对象是父类Animal的一个实例对象
console.log(p1.__proto__ instanceof Animal); //结果为true说明p1的原型对象是父类Animal的一个实例对象
console.log(Animal.prototype);
/*
  Person是一个类,它存在一个原型对象，通过类的prototype属性和Person类实例对象的__proto__属性能够访问到这个原型对象
  ，且都是同一个，所以p1.__proto__ === Person.prototype的结果为true。而由于Person它的父类是Animal所以说Person类
  的实例的原型对象是Animal类的一个实例对象
*/
```

## new 运算符

- 概念:new 运算符是创建对象时调用要使用的运算符

- 当使用 new 去调用一个函数时会发生以下过程:

  1.创建一个普通的 js 对象 2.将新创建的实例对象的\_\_proto\_\_属性的指向设置为指向类或者是构造函数的属性 prototype 指向的原型对象 3.使用实参来调用构造函数，并且将函数中的 this 指向改为指向实例对象。

# 闭包

> [参考文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures)

## 闭包的概念

    1.能访问到外部作用域中变量的函数
    2.什么时候使用:当我们需要隐藏一些不希望被人访问的内容时可以使用闭包。
    3.闭包的构成条件:
        (1).函数的嵌套
        (2).内部函数要引用外部函数中的变量
        (3).内部函数要作为返回值返回

## 函数作用域

```js
let a = "全局变量a";
function fn() {
  console.log(a);
}

function fn2() {
  let a = "局部变量a";
  fn(); //输出全局变量a
  console.log(a); //输出局部变量a
}

fn2();
```

- 函数作用域在函数创建时就已经确定了(词法作用域)和函数被调用的位置无关，所以在以上代码实例中 fn 函数输出的是全局变量 a，而不是局部变量 a。

## 闭包的生命周期

1.闭包在外部函数被调用时产生，外部函数每次被调用都会产生一个全新的闭包  
2.在内部函数失去时销毁(内部函数被垃圾回收了，闭包才会消失)

:::tip 注意
注意事项:  
 1.闭包主要用来隐藏一些不被外部访问的内容，这就意味着闭包需要消耗一定的内存空间。  
 2.相较于类来说，闭包比较浪费内存空间(类可以使用原型而闭包不能)
需要执行次数较少时用闭包，需要大量创建实例时，使用类

:::

# 正则表达式

> [参考文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions)

> [菜鸟文档](https://www.runoob.com/jsref/jsref-obj-regexp.html)

## 概念和作用

    概念:正则表达式是用于匹配字符串中字符组合的模式。
    作用:正则表达式用来定义一个规则
        通过这个规则计算机可以检查一个字符串是否符合规则，或者将符合规则的内容提取出来。
    注意:正则表达式也是JS中的一个对象，所以要使用正则表达式，需要先创建正则表达式的对象。

## 创建正则表达式的两种方式

1.通过构造函数来创建正则表达式的对象  
 该构造函数可以传入两个参数:1.正则表达式,2.匹配模式

```js
let reg = new RegExp();
//通过这种方式创建正则表达式时，它的转义符号时//
```

2.使用字面量创建正则表达式:/正则/匹配模式

```js
let reg2 = /\w/i;
```

## 语法

```js
let test2 = /a/; //检查字符串中是否有a
console.log(test2.test("abcd")); //输出true
// |在正则表达式中表示或

let test2 = /a|b/; //检查字符串中是否有或者b有两者中的一个就行

console.log(test2.test("bcd")); //输出true

//[]表示或(字符集)

let test3 = /[abcdefg]/; //只要检索的字符串中有方括号中任意一个字符即可返回true
console.log(test3.test("f")); //输出true

//[a-b] 表示查找字符串中是否含有指定范围内的数
```

# call和apply

- 相同点:二者都能调用函数且指定this的指向
- 不同点:就是 `call()` 方法接受的是**一个参数列表**，而 `apply()` 方法接受的是**一个包含多个参数的数组**。
- `call(this指向参数,实参1,实参2,实参3)`
- `apply(this指向参数,[实参数组])`

```js
let fn = function () {
   console.log(this);
 };
function fn2(a, b) {
   console.log(`a是${a},b是${b}`);
   console.log(this);
}
let obj = { name: "obj", fn };
 fn(); //this指向的是window
 fn.call(obj); //this指向的是对象obj
 fn2.call(obj, 1, 2);
 fn2.apply(obj, [4, 5]);
```

## bind

- **`bind()`** 方法创建一个新的函数，在 `bind()` 被调用时，这个新函数的 `this` 被指定为 `bind()` 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。
- 新函数的this绑定后,不管函数以何种方式调用,this的指向都不会改变
- bind函数调用时除了第一个this指向的参数,其余参数会作为新函数的参数且无法更改



# 内置对象

## JSON

[JSON 教程 ](https://www.runoob.com/json/json-tutorial.html)

### 对象的序列化

- JS中的对象使用时都是存储于计算机内存中

- 序列化指将一个对象转化为可以存储的格式

  ​	在JS中的对象序列化通常是指将一个对象转化为字符串(JSON字符串)

- 序列化的用途

  - 对象序转化为字符串后,可以在不同类型中的语言中传递
  - 甚至人可以直接对字符串进行读写操作

- 如何进行序列化

  - 在JS中存在一个工具类JSON(JavaScript Object Notation) JSON对象表示法
  - JS对象序列化后会转化为一个字符串,这个字符串称之为JSON字符串

- 也可以手动编写JSON字符串,很多程序的配置文件就是用JSON编写的

- 编写JSON的注意事项

  - JSON字符串有两种类型
    - JSON对象{}
    - JSON数组[]
  - JSON字符串中的对象的属性名必需使用双引号引起来
  - JSON中可以使用的数据类型
    - 数字(Number)
    - 字符串(String):必需用双引号
    - 布尔值(Boolean)
    - 空值(Null)
    - 对象(Object)
    - 数组(Array)
  - JSON的格式和JS对象的格式基本一致
    - JSON中如果最后一个属性的后面不要再加括号

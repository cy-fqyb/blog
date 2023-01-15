---
title: Cocos脚本开发
date: 2022-10-27 00:52:52
permalink: /pages/a6c48b/
categories:
  - notes
  - Cocos
tags:
  - 
---
# Cocos脚本开发

[官方文档](https://docs.cocos.com/creator/2.4/manual/zh/scripting/use-component.html)

## 创建与使用脚本

### 创建组件脚本

* 在资源管理器中，右键点击scripts文件夹点击新建再点击JavaScript来创建JS脚本文件。

<img src="C:\Users\cy\Desktop\Cocos-js.png" alt="Cocos-js" style="zoom:50%;margin-left:0;" />

* 范例脚本如下:  

```js
cc.Class({
    extends: cc.Component,
 
    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        // defaults, set visually when attaching this script to the Canvas
        text: 'Hello, World!'
    },
 
    // use this for initialization
    onLoad: function () {
        this.label.string = this.text;
    },
 
    // called every frame
    update: function (dt) {
 
    },
});
 
```

### 编辑脚本

1.首先要在编辑器里设置文本编辑器(Cocos默认vs2017)

<img src="C:\Users\cy\Desktop\Cocos-set.png" alt="Cocos-set" style="zoom:50%;margin-left:0;" />

2.在资源管理器中双击需要编辑的js文件即可跳转至文本编辑器对脚本进行编辑



### 为节点添加脚本

* 如果想给某一节点添加则选中该节点，在属性检查器中选择添加组件，选择用户脚本组件在这我们能够看到我们创建的JS文件。
* 最简单的方法:选中想要的节点按住js文件直接拖入属性检查器中（早说啊）:100:

<img src="C:\Users\cy\Desktop\Cocos3.png" alt="Cocos3" style="zoom:50%;margin-left:0;" />



## 基本语法

> 调用cc.Class这个API用来创建类



### 定义类

* 调用cc.Class来创建类

```js
let Sprite = cc.Class({
    name:'sprite',
    ctor:function () {
        cc.log(this instanceof Sprite);//用来判断该实例是否属于Sprite类、
        //this指向创建的对象实例
    },
    
});

let obj = new Sprite();//调用Sprite类来创建实例对象

cc.log(obj instanceof Sprite);//运用原生javascript来判断obj是否属于Sprite类
```

### 构造函数

* 用**ctor**来创建构造函数
* 用\_ctor\_来创建构造函数用法基本与ctor一致，区别在于ctor会自动调用父级构造函数而\_ctor\_不会。
* 构造函数在创建对象实例的时候会被自动调用，用以给对象的属性初始化赋值
* 其次在子类继承父类的时候，也会自动调用服类的构造函数
* 如何创建构造函数如下:

```js
let Person = cc.Class({
    name:"person",
    //完整写法
    ctor:function(){
         cc.log(this instanceof Person,"hello world");    // true,输出hello world
    }
    //构造函数简写
    ctor(){
    cc.log(this instanceof Person,"hello world");    // true,输出hello world,一样生效，偷懒专用
	}
})
```



### 类的继承

* 使用extends来实现继承
* 继承的作用有:1.避免代码的重复编写、2.在不修改源代码的前提下拓展功能
* 继承的简单理解就是:将父类中的代码copy一份到子类中

```js
let Sprite = cc.Class({
    name:'sprite',
    ctor(age,sex,cname) {
       this.age = age;
       this.sex = sex;
       this.cname = cname;
    },
    
});//父类

let Person = cc.Class({
    extends:Sprite,//在这Person类继承了Sprite类
})//子类
let p1 = new Person(36,"男","张三");//创建实例对象
cc.log(p1.age,p1.sex,p1.cname);
```

### 重写

* 在子类中，如果服类的代吗不能满足开发的需求，则可以对父类代码进行重新定义即重写
* 子类中通过this._super()调用父类成员
* 不论子类是否有定义构造函数，子类实例化前父类的构造函数都会被自动调用。

```js
let Sprite = cc.Class({
    name:'sprite',
    ctor(age,sex) {
       this.age = age;
       this.sex = sex;
    },
    getage(){
        cc.log(this.sex);
    }
});

let Person = cc.Class({
    extends:Sprite,
    //子类在实例化前会调用父类的构造函数先将传入的参数传入父级构造函数，
    //父级构造函数调用完后，子类的构造函数会被调用传入子类的构造函数的参数与传入父级构造函数的参数相同
    ctor(...res){
        this.cname = res[2];
    },
    getage(){
        cc.log(this.cname);//在此处实现了对父类函数getage()的重写
    }
})
let p1 = new Person(36,"男","张三");
let s1 = new Sprite(26,"男");
s1.getage();//输出男
p1.getage();//输出张三
```



### 属性

* 概念:属性是特殊的实例变量，能够显示在 **属性检查器** 中，也能被序列化。

### 属性声明

* 通过在组件脚本中声明属性，我们可以将脚本组件中的字段可视化地展示在 **属性检查器** 中，从而方便地在场景中调整属性值。

#### 简单声明

* 当声明的属性为基本 JavaScript 类型时(js中有的数据类型)，可以直接赋予默认值：

```js
 properties: {
      height: 20,       // number
      type: "actor",    // string
      loaded: false,    // boolean
      target: null,     // object
  }
```

* 当声明的属性具备类型时（如：`cc.Node`，`cc.Vec2` 等），可以在声明处填写它们的构造函数来完成声明，如：

```js
 properties: {
      target: cc.Node,
      pos: cc.Vec2,
  }
```

* 当声明属性的类型继承自 `cc.ValueType` 时（如：`cc.Vec2`，`cc.Color` 或 `cc.Rect`），除了上面的构造函数，还可以直接使用实例作为默认值：

```js
properties: {
      pos: new cc.Vec2(10, 20),
      color: new cc.Color(255, 255, 255, 128),
  }
```

* 当声明属性是一个数组时(可以直接写空数组)，可以在声明处填写它们的类型或构造函数来完成声明，如：

```js
 properties: {
      any: [],      // 不定义具体类型的数组
      bools: [cc.Boolean],
      strings: [cc.String],
      floats: [cc.Float],
      ints: [cc.Integer],

      values: [cc.Vec2],
      nodes: [cc.Node],
      frames: [cc.SpriteFrame],
  }
```

#### 完整声明

* 完整声明即声明属性的值为对象，可以在对象中添加其他属性参数控制属性在属性检查器中的显示方式(即属性对象的属性)
* 有些情况下，我们需要为属性声明添加参数，这些参数控制了属性在 **属性检查器** 中的显示方式，以及属性在场景序列化过程中的行为。例如：

```js
properties: {
    score: {
        //score是一个属性但它的值是一个对象，在里面可以设置一些内置的属性参数，用来控制属性的显示方式
        default: 0,
        displayName: "Score (player)",
        tooltip: "The score of player",
    }
}
```

* 常用的属性参数有:

|   属性参数    |                             作用                             |
| :-----------: | :----------------------------------------------------------: |
|    default    | 设置属性的默认值，这个默认值仅在组件 **第一次** 添加到节点上时才会用到 |
|     type      |          设置属性的数据类型，类似声明属性的数据类型          |
|    visible    | 设置属性在属性检查器中的可见性，为true时强制其可见无论是否以下滑线开头，为false时强制其不可见。 |
| serializable  |          控制属性是否序列化，如果为false则不序列化           |
|  displayName  |                 控制在属性检查器中显示的名字                 |
|    tooltip    |            在 属性检查器 面板中添加属性的 Tooltip            |
| override 参数 | 所有属性都将被子类继承，如果子类要覆盖父类同名属性，需要显式设置 override 参数，否则会有重名警告 |

### getter与setter方法

* 祖传数据劫持


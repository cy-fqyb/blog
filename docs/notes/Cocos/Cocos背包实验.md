---
title: Cocos背包实验
date: 2022-11-02 23:57:01
permalink: /pages/f5ec76/
categories:
  - notes
  - Cocos
tags:
  -
---

# Cocos 背包实验:dog:

> 枫桥夜泊

## 效果展示

<img src="/fqyb-blog/notesImg/笔记1.png" alt="image-20221102171109389" style="zoom:50%;" />

## 场景搭建

### ScrollView

- 在根节点处创建一个 UI 节点 ScrollView(建议命名为 Bag)
- ScollView 属性设置
  - 设值 Bag 节点的 width 为 210，height310。(可以设置其它宽高，建议自行调整)
  - 将图片资源中的 fengyun_jinengK02 拖给 Bag 节点的 SpriteFrame 属性作为背景。
  - 设置 View 节点的宽高为 200，300(重点)
  - 给 content 节点添加 UI 组件 Layout(Layout 中的 type 设为 grid，ResizeMode 设为 container，StartAxis 设为 horizontal)
- 在根节点处创建一个空节点 Ctrl 用来挂载 js 文件

<img src="/fqyb-blog/notesImg/笔记2.png" alt="image-20221102171437148" style="zoom:50%;" />

### 创建预制体

- 创建一个空节点(建议命名为 Item)
- 将 frame_kuang_1 图片拖入到 Item 节点的 spriteFrame 属性中
- 将 zhuangbei_kuang01_g 拖入到层级管理器中作为 Item 的子节点(建议改名为 Mask，然后在属性检查器中将最上方的 Mask 旁的勾取消勾选)
- 随便拖入一张装备图到 Item 节点下(建议重命名为 Icon)
- 给 Item 节点拖入 UI 组件 Toggle，然后将 Mask 节点拖入到 Toggle 组件的 CheckMask 属性中，将 IsChecked 取消勾选
- 属性调整:
  - Item 的宽高为 100，100
  - Mask 宽高为 100，100
  - Icon 宽高为 80，80
  - 设置 Num 的 fontsize 为 40，LineHei 为 40，拖到整体的右下角。
- 按住 Item 节点拖入到资源管理器中形成预制体。

## 编写 js 代码 💪

### js 的代码的解析

- 创建一个 js 文件 Bag

```js
//定义一个类用来创建保存装备信息的对象
const BagItem = cc.Class({
  name: "bagItem",
  properties: {
    //定义一个id,毛用没有
    id: 1,
    //定义一个变量用来保存装备数量
    Num: 10,
    //定义一个变量用来指定背景图片
    icon: cc.SpriteFrame,
  },
});

cc.Class({
  extends: cc.Component,

  properties: {
    //获取图标挂载的的父节点
    itemRoot: cc.Node,
    itemList: [BagItem],
    itemPrefab: cc.Prefab,
  },
  start() {
    this.createItem();
  },
  createItem() {
    console.log("哈哈");
    for (let i = 0; i < this.itemList.length; i++) {
      //定义一个变量来保存bagItem数据
      let itemData = this.itemList[i];
      //利用预制体创建对象
      let itemObj = cc.instantiate(this.itemPrefab);
      //将对象挂载
      itemObj.parent = this.itemRoot;
      //定义一个变量用来保存icon的sprite组件
      let iconSprite = itemObj.getChildByName("Icon").getComponent(cc.Sprite);
      //定义一个变量用来保存预制体的label组件
      let numLabel = itemObj.getChildByName("Num").getComponent(cc.Label);
      //将itemData指定保存的数据赋值给创建的预制体对象
      //确定装备图
      iconSprite.spriteFrame = itemData.icon;
      //确定装备数量
      numLabel.string = itemData.Num;
    }
  },
});
```

### js 代码的挂载和变量赋值

- 挂载:直接将 Bag 文件挂载给 Ctrl 节点即可

- 变量的赋值:
  - 将 Bag 节点下的 content 节点拖入赋值给 ItemRoot
  - ItemList 用来设置展示的装备的种类数量(随便设一个即可，然后给里面的每一个子对象设置装备的数量和图片即可，Num 是装备数量，Icon 是装备图片)
  - 将创建好的预制体拖给 ItemPrefab 变量

![image-20221102171715550](/fqyb-blog/notesImg/笔记3.png)<img src="/fqyb-blog/notesImg/笔记4.png" alt="image-20221102171756238" style="zoom:50%;" />

## 实验总结:100:

### 涉及到的重要知识点

- 使用`cc.Class()`声明一个类:[使用 cc.Class 声明类型-官方文档](https://docs.cocos.com/creator/2.4/manual/zh/scripting/class.html)
- UI 组件(Toggle 组件，Layout 组件):[UI 组件参考 - 官方文档](https://docs.cocos.com/creator/2.4/manual/zh/ui/ui-components.html)

### 用到的 API

- getChildByName()

  - [官方文档](https://docs.cocos.com/creator/2.4/api/zh/classes/Node.html#getchildbyname)
  - 作用:用来获取指定节点的子节点
  - 使用格式:`let node = this.node.getChildByName('子节点名称')`

- getComponent()

  - [官方文档](https://docs.cocos.com/creator/2.4/api/zh/classes/Mask.html#getcomponent)

  - 作用:用来获取节点上指定数据类型的组件

  - 使用格式:`let label = this.node.getComponent('cc.Label')`

## 拓展补充

> 实现通过点击按钮来改变装备的数量

### 效果如下

<img src="/fqyb-blog/notesImg/CocosBag/bagAdd.png" alt="image-20221102171437148" style="zoom:50%;margin-left:500px" />

### 关键代码

- 创建另外一个 Js 文件写入下方代码

```js
cc.Class({
  extends: cc.Component,

  properties: {},
  statics: {
    instance: null,
  },
  start() {
    //创建一个单例对象
    this.constructor.instance = this;
  },
  numAdd(event) {
    //获取到装备是否被选中
    //console.log(event.isChecked);
    let numChecked = event.isChecked;
    //获取到所选装备的Label组件，或者说获取这个对象的地址
    let numLabel = event.node.getChildByName("Num").getComponent(cc.Label);

    //将二者整合成一个对象后返回
    let numObj = {
      numChecked,
      numLabel,
    };
    //将整合好的对象放到Num类的身上
    this.constructor.instance.numObj = numObj;
  },
});
```

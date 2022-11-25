---
title: Vue2(2)
date: 2022-10-11 21:09:03
permalink: /pages/a4910f/
categories:
  - notes
  - vue
tags:
  - 
---
# ref 属性

1. 被用来给元素或子组件注册引用信息(类似于标签的 id)
2. 应用在 html 标签上获取的是真实 DOM 元素，用在组件标签上获取的是组件实例对象(vc)
3. 使用方式:

```html
<!-- 用在html标签上获取真实DOM元素 -->
<h1 v-text="msg" ref="title"></h1>

<!-- 获取组件实例对象 -->
<School ref="sch" />
```

```js
// 获取对应标识的元素;
this.$refs.xxx; //(标识名)
```

# props 属性

- 用于父组件向子组件传递数据

```html
<!-- 传递数据 -->
<Student name="张三" :age="13" sex="男" />
```

- props 的三种写法

```js
//简单声明接收
props:['name','age','sex'],

//接收的同时对数据进行类型限制
props:{
  name:String,
  age:Number,
  sex:String,
},

//接收数据的同时:进行类型限制和默认值的指定和必要性的限制
props:{
  name:{
    type:String,//name的类型必需是字符串
    required:true,//name是必需的
  },
  age:{
    type:Number,
    default:99,//默认值
  },
  sex:{
    type:String,
    default:'变态'
  }
},
```

- props 只允许读取数据不允许修改数据,Vue 底层会监测你对 props 的修改,如果进行了修改则会报错。
  如果需要修改,则将 props 传递的数据赋值给 data 一份,然后修改 data 中的数据

- 当 props 传递的数据和 data 的数据冲突时,以 props 传递的为主。

# mixins 混合

- 混合就是将组件中重复的代码抽离出来构成一个模块，在需要使用时直接引入即可,以此来实现代码的复用。
- 将混合模块用 Es6 模块化语法暴露出去,
- 在需要的组件中引入,并用 mixins 属性配置好即可

:::tip
当混合模块中数据与组件自身的数据冲突时,组件自身的数据优先级更高。
当引入的混合是钩子函数且发生冲突时,两者的都会生效,混合的钩子优先生效。
:::

```js
//minxin模块
const mixin = {
  methods: {
    showName() {
      alert(this.name);
    },
  },
  data() {
    return {
      sex: "男",
    };
  },
};

export { mixin };

//需要引入混合的组件
import { mixin } from "../mixin.js";
export default {
  name: "Student",
  data() {
    return {
      name: "张三",
      age: 34,
    };
  },
  mixins: [mixin], //在该属性中配置即可
};
```

## 混合分类

- 局部混合:在组件中引入并使用的混合叫局部混合
- 在 main.js 中用:Vue.mixin(xxx)引入的混合叫全局混合

# 插件

- 插件也是一个封装的代码模块(本质是一个对象)
- 插件内部需要一个 install 函数(该函数 Vue 会自动调用)
- 在 main.js 里先引入插件 ,再使用 Vue.use(xxx)使用插件。
- 插件的 install 函数将 Vue 的构造函数作为形参传入进去

```js
//插件
export default {
  install(Vue) {
    //定义了一个全局的自定义指令
    Vue.directive("fbind", {
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
    });
  },
};

//导入并引用插件
import chajian from "./plugin/plugins";
Vue.use(chajian);
```

# scoped

- 给组件的 style 样式加上 scoped 属性意为:限定样式只在该组件中生效,如果不加则会全局生效。

# webStorage

1. 存储内容大小一般支持 5MB 左右。(不同浏览器可能不一样)
2. 浏览器端通过 window.sessionStorage 和 window.localStorage 属性来实现本地存储机制
3. 相关 API

   1. xxxStorage.setItem('key','value')
      该方法会接收一个键和值作为参数,会把键值对添加到存储中,如果键名存在,则更新其对应的值
   2. xxxStorage.getItem('键名')
      该方法会接收一个键名作为参数,返回键名对应的值。
   3. xxxStorage.removeItem('key')
      该方法会接收一个键名作为参数,并把键名从存储中删除
   4. xxx.Storage.clear()
      该方法会将存储的数据全部删除。

4. 备注:
   1. SessionStorage 存储的内容会随浏览器窗口的关闭而消失。
   2. LocalStorage 存储的内容需要手动清除才会消失
   3. xxxStorage.getItem(xxx)如果 xxx 对应的 value 值获取不到,那么 getItem 的返回值是 null
   4. JSON.pase(null)的结果依然是 null

# 自定义事件

- 可用于子组件向父组件传递数据

## 绑定自定义事件的两种方式

- 直接在父组件中通过给子组件的标签绑定事件

  - ```html
    <template>
      <div>
        <Student 
        @cy='demo'
        ref="stu"
        />
      </div>
    </template>
    ```

- 通过调用$on方法绑定事件

  - ```js
    import Student from './components/Student.vue'
    export default {
        name:'App',
        components:{Student},
        methods:{
            demo(value){
                console.log(`学生名字是${value}`);
            },
            demo2(value){
              alert(`学生名字是${value}`);
            }
        },
        mounted(){
          this.$refs.stu.$on('cy2',this.demo2)
        }
    }
    ```

## 解绑自定义事件

- 通过调用$off(事件名)方法解绑自定义事件(只适用于解绑一个自定义事件)
- 通过调用$off([事件1，事件2，事件3，...])(用来解绑多个事件)
- 调用$off()函数不传入任何参数时表示解绑所有的事件

## 触发自定义事件

- this.$emit('事件名',传入的数据)

- 组件上也可以绑定原生DOM事件,需要使用native修饰符

- 注意点:通过this.$refs.xxx.$on('事件名',回调函数)绑定自定义事件时,回调要么配置在methods中,

  要么用箭头函数,否则this指向会出问题



# 全局事件总线


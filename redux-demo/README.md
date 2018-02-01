# Redux-Demo 计算器


## 效果图
![效果图展示1](../ReadmeImage/效果图.png)

![效果图展示2](../ReadmeImage/效果图2.png)

## 功能
+ [x]  简单的+-*/
+ [x] 带括号的四则运算
+ [x] 科学计算器功能:sin cos % lg 等
+ [x] 抛错处理
+ [x] 查看/清除计算记录


## 运行
```
git clone https://github.com/EmilyYoung71415/LearnReactDemo  

cd LearnReactDemo

cd redux-demo

npm install

npm start
```

## 项目结构
```
├──redux-demo/                 * 计算器Demo
      |
      |————src/                * 主程序
            │
            ├─Components       * 所有组件 
            │  ├─Calculator    * 计算器
            │  ├─Counter       * 计数器 
            │  └─StudyDemos    * 学习的一些有帮助的demo 
            │      └─备份文件夹 * 笔记 等我写完博客就清 
            ├─Error            * 错误组件 
            ├─Redux            * Redux 
            │  ├─Action
            │  ├─Containers
            │  ├─Reducer
            │  └─Store
            ├─Router           * 路由
            └─Style            * 所有样式变量 
```
## 个人感悟
## 1. 木偶组件和容器组件
木偶组件Presenter Component ： 给啥输出啥//也可理解为UI组件
容器组件：Container Component : 在容器组件中准备好数据和一些callbac函数,处理一些事件或管理内部的状态 , 个人理解是中心枢纽及加工厂的作用

在redux中充当容器组件作用的就是Connected Component : 这类组件和Redux的store进行了连接，并且获取到store的数据之后进行一些操作后传递给子组件即定义一个Container Components，然后把一些Presenter Components都作为他的子组件,父组件关注如何工作，子组件关注如何展现。

当组件只负责展示如header标题栏等，就做成UI组件即可。
当组件既有UI又有业务逻辑：将它拆分成：UI组件 + 容器组件。UI组件外面是容器组件，容器组件负责与外部通信，将数据传给后者，由后者渲染出视图。

----------


## 2. props和state
**区别：**

`state`: state是组件自己管理数据，控制自己的状态，可变，相当于组件的私有属性，表示**临时的内部的**状态数据。通过this.setState()方法来修改state，constructor是唯一能够初始化的地方

`props`: props是外部传入的数据参数(如父组件向子组件传递数据)，只能通过外部组件主动传入新的props来重新渲染子组件，否则子组件的props不会改变。通常存储一些方法，一些可能需要存库的长期数据和一些需要传递和共享的数据

**联系:**
一个组件的显示形态可以由数据状态和外部参数所决定,外部参数也就是props，而数据状态就是state。
没有state的叫做无状态组件，有state的叫做有状态组件；
多用props，少用state。也就是多写无状态组件。


----------


## 3. react与redux关系

React本身是个状态机，也就是说组件是state的表现形式。UI = F(data)
那么Redux提供了一个全局的唯一的状态树，是不是就不需要组件本身的state了呢？当然不是，需要共享的或者数据很复杂需要抽取放到公共数据管理平台处理才把数据委托给redux管理嘛。

Redux的全局唯一的state（全局唯一状态树）：存放的是长期数据（并不一定要求是长期数据）和用于在多个组件中共享的数据。

Redux和React的关系：
1.React从Redux的state读取数据
2.React能dispatch分发actions到Redux，Redux的reducer来返回一个新的state

全局状态树的构建：通过 reducer
数据自顶向下移动，组件可以选择将其状态作为属性传递给其子组件：如 FormattedDate 组件将在其属性中接收到 date 值，但不知道它是来自 Clock 状态、还是来自 Clock 的属性、亦或手工输入。这就是单向数据流，任何状态始终由某些特定组件所有，并且从该状态导出的任何数据或 UI 只能影响树中下方的组件


**关于redux：**
使用Redux做状态管理：当我们谈论redux时，我们可以看到很多关于redux的优点总结有：共享组件状态、组件间通信，统一记录/管理 action，time travel/undo/redo 等等功能。不过那些都是次要的，Redux 最重要的优点是可预测性，对于既定输入一定会产生既定输出。

可预测性有什么优点呢？最直观的优点就是易于测试，如果没有 I/O 当然最好，如果有的话需要加一层 middleware 处理写 mock 也不难；其次是数据的流动会非常清晰，这点搞一个 redux-devtool 就可以看出来；第三点是你可以先写数据结构和业务逻辑再写 UI.



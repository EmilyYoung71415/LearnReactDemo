/**
 *  @author yxy
 *  @desc  redux的一些助理解的话
 *  @date 2017/12/31
 */

 /**
  *  1. 木偶组件和容器组件
     木偶组件Presenter Component ： 给啥输出啥//也可理解为UI组件
     容器组件：Container Component
        在容器组件中准备好数据和一些callbac函数,处理一些事件或管理内部的状态
        个人理解是中心枢纽及加工厂的作用
     在redux中充当容器组件作用的就是Connected Component:
        这类组件和Redux的store进行了连接，并且获取到store的数据之后进行一些操作后传递给子组件
        即定义一个Container Components，然后把一些Presenter Components都作为他的子组件,
        父组件关注如何工作，子组件关注如何展现。

    如果一个组件既有UI又有业务逻辑？
    将它拆分成下面的结构：
        外面是一个容器组件，里面包了一个UI 组件。
        前者负责与外部的通信，将数据传给后者，由后者渲染出视图。

  */
/**
 *  React-Redux
 *      connect()
 *          connect(mapStateToProps,mapDispatchToProps)(TodoList)将输入输出逻辑与UI组件相连生成容器组件
 *          //给皮囊赋予思想
 *      mapStateToProps() 
 *          //输入逻辑：外部的数据（即state对象）如何转换为 UI 组件的参数
 *      mapDispatchToProps()
 *          //输出逻辑：用户发出的动作如何变为 Action 对象，从 UI 组件传出去。
 *      <Provider> 组件
 *          //connect方法生成容器组件以后，需要让容器组件拿到state对象，才能生成 UI 组件的参数。
 *          //React-Redux 提供Provider组件，可以让容器组件拿到state。
 *          //即Provider的唯一功能就是传入store对象。
 *          
            <Provider store={store}>
                <App /> //Provider在根组件外面包了一层，这样一来，App的所有子组件就默认都可以拿到state了。
                //原理是React组件的context属性
            </Provider>
 */

  /**
   *  2. Redux的单一状态树state完全替代了React的状态机props？
   *  何时用React组件的state、props？
   *  比如在todomvc中： 【功能包括：新增任务，切换任务完成状态，过滤任务列表，编辑及删除任务】
   *    存在state中的： 
   *            1. 列表过滤功能如完成未完成全部的选择
   *            2. 每一项的编辑功能：双击实现编辑        
   *    即存在state中的表示【临时的】【内部的】状态数据
   *    存在props中的：
   *            1. App组件中的todos代表任务数组
   *            2. actions代表一些操作的方法
   *            3. Footer组件中的activeCount、completedCount
   *    props通常存储一些方法，一些可能需要存库的长期数据和一些需要传递和共享的数据。 
   *    
   *    总结Redux与React关系：
   *    1. React从Redux的state读取数据
   *    2. React能dispatch分发actions到Redux，Redux的reducer来返回一个新的state
   *    React组件就像是个婴儿，Redux就像是奶妈：
   *         婴儿饿了，哭着要要奶喝，就是dispatch actions的过程
   *         奶妈准备好给婴儿喂奶就是，React从Redux的state读取数据的过程
   *    state与props辨析：
   *    props: 在render函数中，组件内部是使用this.props来获取传递到该组件的所有数据,它是一个对象，包含了所有你对这个组件的配置
   *    props是一个从外部传进组件的参数，
   *    主要作用就是从父组件向子组件传递数据，它具有可读性和不变性，
   *    只能通过外部组件主动传入新的props来重新渲染子组件，否则子组件的props以及展现形式不会改变。
   *    
   *    state：
   *        一个组件的显示形态可以由数据状态和外部参数所决定，外部参数也就是props，而数据状态就是state。
   *    state可以被改变的通过this.setState()方法来修改state。
   *    通过this.state=来初始化state，使用this.setState来修改state，constructor是唯一能够初始化的地方。
   *    state的主要作用是用于组件保存、控制以及修改自己的状态,算是组件的私有属性
   * 
   *    state是组件自己管理数据，控制自己的状态，可变；
   *     props是外部传入的数据参数，不可变；
   *     没有state的叫做无状态组件，有state的叫做有状态组件；
   *     多用props，少用state。也就是多写无状态组件。
   */

   /**
    *  全局单一状态树state构建：通过 reducer
        数据自顶向下移动
            组件可以选择将其状态作为属性传递给其子组件：
                FormattedDate 组件将在其属性中接收到 date 值，
                但不知道它是来自 Clock 状态、还是来自 Clock 的属性、亦或手工输入
                这就是单向数据流 任何状态始终由某些特定组件所有，并且从该状态导出的任何数据或 UI 只能影响树中下方的组件。
            

    */
/**
 *  @desc 计算器
 *  一 UI组件划分层级
 *   划分四个组件
 *      1. 包含整个栗子 MyCalculator
 *      2. input展示框 ShowDataBar
 *      3. 按键列表 ButtonList
 *      4. 每个单独的按键  Button
 *      ----MyCalculator
 *      --------ShowDataBar
 *      --------------ButtonList
 *      --------------Button
 * 
 *  二 用 React 创建一个静态版本
 *       Json数据: 按钮的值
 *      //层级的最高层将json数据做为prop传入 一层一层一层传下去 先构建单向数据流
 *      获得值之后再布局
 * 
 *  三 定义 UI 状态的最小(但完整)表示 
 *     为了使你的 UI 交互，需要能够触发对底层数据模型的更改。此时使用state
 *          考虑应用所需要的最小可变状态集
 *     当前实例中拥有的所有数据:
 *          input展示数据文本[等号前 + 等号后 拼接而成]
 *              等号及等号前的数据 //stringdata
 *              等号后的数据  //result
 *          按钮的值
 *      接下来在这些数据中找出应该是state的数据：
 *      遵循三原则：1. 是否是通过父级props传来的，如果是则可能不是state
 *                 2. 会随时间推移而不变吗？ 如果是则可能不是state
 *                 3. 你能根据组件中其他任何的state或者props计算出他吗？如果能,则可能不是state 
 *      综上:
            等号及等号前的数据: 通过用户的输入而来 会随时间推移而变 state
            等号后的数据: 能够计算得出
            按钮的值: 来源于父级props层层传递而来
 *      由上:
 *          我们得到的state有：
 *              等号及等号前的数据 
 *  
 *   四. 确定你的 State 应该位于哪里
 *      ----MyCalculator 
 *      --------ShowDataBar 需要展示等号前的数据state 
 *                          + 根据state计算出当前的值
 *      --------------ButtonList
 *      --------------Button
 * 
 *      所以state应该放在最高级的MyCalculator组件里
 * 
 *  五. 添加反向数据流
 * 
 */




 


/**
 *  @desc 定义定义映射 输入输出逻辑
 *  @func 功能模块--container
 *  将UI组件的value值[props]映射到state
 *  将UI组件的方法映射到action 通过dispatch触发action
 */

//将UI组件的props与redux的state映射
function mapStateToProps(state) { //TODO:将所有的function改为箭头函数
    return {
        value: state.value
    }
}
  
//将UI组件的props与redux的action映射
function mapDispatchToProps(dispatch) {
    //判断当前按钮的值 根据不同的值来确定不同按钮的分发action
    //console.log(onButtonClick)
    return {
        //用户的按钮点击onButtonClick方法与action映射([3]定义action),通过dispatch触发reducer
        //onButtonClick: () => dispatch(increaseAction)
        //dispatch(这里面的action是事先定义好的)
    }
}

/**
 *  @desc 定义action 
 *  定义action 纯函数 输入什么输出什么 收到的action返回一个type字段
 *  dispatch拿着这个type字段去找reducer，reducer根据不同type匹配不同的动作 并最终返回一个新state
 *  @func 功能模块--action
 *  依据按钮的不同值来确定按钮的actiontype [之前是加减对应不同的函数，不同的函数即对应不同的type]
 *  @param 两个action：
 *         1.常规按钮 NORMALBTN //按钮值增加到input框中
 *         2.等于按钮 EQUALBTN //按钮值添加到input框并计算结果,最后把结果放到input框中
 */

const NORMALBTN = 'NORMALBTN';
const EQUALBTN = 'EQUALBTN';
const normalAction = { type: NORMALBTN }
const equalAction = { type: EQUALBTN }

/**
 *  @desc 给UI组件用connect()方法附上输入输出逻辑[逻辑],生成一个容器组件App
 *  @func 功能模块--container
 */

const App = connect(
    mapStateToProps,
    mapDispatchToProps
)(MyCalculator)



/**
 *  @desc 用户触发什么action对应返回一个经过reducer处理的新state，不同type对应不同的处理方式
 *  @func 功能模块--reducer
 */
function convertType(state ={value:0}, action) {
    switch (action.type) {
    case NORMALBTN:
        return {
            value: state.value
         };
    case EQUALBTN:
        return{ 
            value: state.value + '222'   //测试 
        }; 
    default:
        return state
    }
  }

/**
 *  @desc 以reducer做为传入值生成一个store对象
 *  @func 功能模块--store
 */
const store = createStore(convertType)

/**
 *  最后
 *  @desc 使用Provider组件在根组件外面包一层 App及其子组件就可以拿到state了
 */
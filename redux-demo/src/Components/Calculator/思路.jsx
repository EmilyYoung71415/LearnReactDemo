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

/**
 *  @desc 搜索框展示用户数据 [变相的todolist]
 *  
 *  一. UI划分组件层级
 *     模型构建正确：决定UI和组件结构被很好的映射,因为UI和数据模型往往遵循相同的信息架构
 *         1.划分五个组件：
 *              FilterableProductTable  包含了整个例子 
 *              SearchBar  接受所有的用户输入[input框]
 *              ProductTable  根据用户输入过滤并展示数据集合 [类似于todolist列表]
 *              ProductCategoryRow  展示每个分类的标题
 *              ProductRow  用行来展示每个产品
 *         2.将组件整理成层级结构
 *           --FilterableProductTable 
 *           ------SearchBar
 *           ------ProductTable
 *           -----------ProductCategoryRow
 *           -----------ProductRow
 * 
 *  二. 用 React 创建一个静态版本
 *          --FilterableProductTable //层级的最高层将json数据做为prop传入 一层一层一层传下去
 *          React 的单向数据流(也叫作单向绑定)保证了一切是模块化并且是快速的。
 * 
 *  三. 定义 UI 状态的最小(但完整)表示
 *          为了使你的 UI 交互，需要能够触发对底层数据模型的更改。此时使用state
 *          考虑应用所需要的最小可变状态集
 *          如:todolist 最小可变状态是包含todo事项的数组
 *     当前实例中有拥有的所有数据:
 *          原产品列表 
 *          用户输入的搜索文本
 *          复选框的值
 *          产品的筛选列表
 *      接下来在这些数据中找出应该是state的数据：
 *      遵循三原则：1. 是否是通过父级props传来的，如果是则可能不是state
 *                 2. 会随时间推移而不变吗？ 如果是则可能不是state
 *                 3. 你能根据组件中其他任何的state或者props计算出他吗？如果能,则可能不是state 
 *      综上:
 *          原产品列表 不是state,因为从props传入
 *          用户输入的搜索文本 可能是state,因为随时间改变且不能计算出来
 *          复选框的值   可能是state,因为随时间改变且不能计算出来
 *          产品的筛选列表  不是state,因为可以通过原始产品列表与搜索文本和复选框的值组合计算出来
 *      由上:
 *          我们得到的state有：
 *              用户输入的搜索文本  
 *              复选框的值
 * 
 *  四. 确定你的 State 应该位于哪里
 *      以上我们确定了state的最小集合,接下来我们确定哪些组件应该拥有哪个state
 *      策略：
 *      1. 确定每一个需要这个 state 来渲染的组件。
 *      2. 找到一个公共所有者组件(一个在层级上高于所有其他需要这个 state 的组件的组件)
 *      3. 这个公共所有者组件或另一个层级更高的组件应该拥有这个 state。
 *      4. 如果你没有找到可以拥有这个 state 的组件，创建一个仅用来保存状态的组件并把它加入比这个公共所有者组件层级更高的地方。
 *      
 *       --FilterableProductTable 高于所有需要state的组件,做为公共所有者组件
 *           ------SearchBar    需要展示搜索文本和复选框状态
 *           ------ProductTable  需要根据 state 过滤产品列表
 *           -----------ProductCategoryRow
 *           -----------ProductRow
 *      所以state应该放在最高级的FilterableProductTable组件里
 *  
 *  五. 添加反向数据流
 *      到目前为止: 我们实现了一个单向数据流的应用
 *      它的数据在层级中通过函数的 props 和 state 向下流动
 *      现在我们添加反向数据流动:让最底层的最面向用户的组件去改变更新父组件的值
 *          层级结构中最底层的表单组件去更新在 FilterableProductTable 中的 state。
 *      表单类的事件响应：
 *          读取文本框的值:
 *             通过onChange事件的回掉函数handleChange()里的event.target.value读取
 *          bind方法为事件相应函数增加一个参数：事件响应函数通过该参数识别事件源。
 * 
 * 总结:
 *      这样写虽然代码多了很多但是！
 *          当你开始构建大型组件库的时候，你会开始欣赏 React 的思路清晰化和模块性，
 *          并且随着代码的复用，你的代码量会开始减少 
 *          
 */
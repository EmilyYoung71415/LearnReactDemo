import React, {Component} from 'react';

import '../../Style/counter.css'

 class MyCounter extends Component {
    render() {
        const {  value,onIncrement, onDecrement } = this.props    
        return (
            <div className='div_class_counter'>
                <h1>简单计数器Demo</h1>
                <p>{value}</p>
                <button onClick={onIncrement}>+ 每次加2</button>
                <button onClick={onDecrement}>- 每次减3</button>
            </div>
        );
    }
}

export default MyCounter;

// 参数 value=> 由state计算得到
// 方法 onIncrement onDecrement => 向外发出action
/**
 * [1] UI组件 两个参数：
 *         参数 value=> 由state计算得到
 *         方法 onIncrement onDecrement => 向外发出action
 * [1-1] 准备action对照表 纯函数 传入什么输出什么  /redux/action/action
 * [2] 定义映射 输入逻辑 输出逻辑 redux/container/container.jsx
 *         mapStateToProps [value 与 state映射]
 *         mapDispatchToProps  [用户方法onIncrement 与action映射 通过dispatch触发reducer]
 * [3] 使用connect生成容器组件  redux/container/container.jsx
 * [4] 定义reducer  /redux/reducer
 *      用户触发什么action对应返回一个经过reducer处理的新state 
 * [5] 以reducer为传入值生成store对象 /redux/store/store
 *      createStore(
 *              combineReducers(reducer)//在进行合并后，计数器的数值将被转移到`state.counter`中。
 *      );
 * [6] 使用Provider组件在根组件外面包一层 子组件就可以拿到state了
 */
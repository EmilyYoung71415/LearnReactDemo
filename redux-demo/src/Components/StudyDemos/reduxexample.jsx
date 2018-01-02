/**
 *  @desc redux-example
 */
import React, { Component } from 'react'
//import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { connect } from 'react-redux'
//import { Provider, connect } from 'react-redux'

// UI组件 
/** [1]
 *  两个参数：
 *  value：由props的得到
 *  方法：向外发出action
 */
class Counter extends Component {
  render() {
    const { value, onIncreaseClick } = this.props
    return (
      <div>
        <span>{value}</span>
        <button onClick={onIncreaseClick}>Increase</button>
      </div>
    )
  }
}

/**
 *  [2] 定义映射 输入输出逻辑
 *  将UI组件的value值[props]映射到state
 *  将UI组件的方法映射到action 通过dispatch触发action
 */


//将UI组件的props与redux的state映射
function mapStateToProps(state) {
    return {
        value: state.count
    }
}
  
//将UI组件的props与redux的action映射
function mapDispatchToProps(dispatch) {
    return {
        //用户的onIncreaseClick方法与action映射([3]定义action),通过dispatch触发reducer
        onIncreaseClick: () => dispatch(increaseAction)
    }
}

/**
 *  [3] 给UI组件用connect()方法附上输入输出逻辑[逻辑],生成一个容器组件App
 */
const App = connect(
    mapStateToProps,
    mapDispatchToProps
)(Counter)



/**
 *  [4] 定义action 纯函数 输入什么输出什么 收到的action返回一个type字段
 *   dispatch拿着这个type字段去找reducer，reducer根据不同type匹配不同的动作 并最终返回一个新state
 */

// Action
const increaseAction = { type: 'increase' }


/**
 * [5] 定义reducer 
 *      用户触发什么action对应返回一个经过reducer处理的新state，不同type对应不同的处理方式
 */
// Reducer
function counter(state = { count: 0 }, action) {
  const count = state.count
  switch (action.type) {
    case 'increase':
      return { count: count + 1 }
    default:
      return state
  }
}

/**
 *  [6] 以reducer做为传入值生成一个store对象
 */
// Store
const store = createStore(counter)

/**
 *  [7] 使用Provider组件在根组件外面包一层 App及其子组件就可以拿到state了
 */

// ReactDOM.render(
//   <Provider store={store}>
//     <App /> 
//   </Provider>,
//   document.getElementById('root')
// )


export {
    App,
    store
}

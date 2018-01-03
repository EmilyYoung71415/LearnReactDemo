/**
 *  首先有redux的基础知识 了解action , reducer ,components的大致关系
 *  即对状态流转图有大致了解
 *  这是帮助你快速入门的例子
 *  @author yxy
 */
import React, {Component} from 'react';


//reducer
const counter = (state = { value: 0 }, action) => {
    switch (action.type) {
      case 'INCREMENT':
        return { value: state.value + 1 };
      case 'DECREMENT':
        return { value: state.value - 1 };
      default:
        return state;
    }
}

class MyCounter01 extends Component {
    // State
    constructor() {
      super();
      this.state = counter(undefined,{});
    }
    
    dispatch(action) {
      this.setState(prevState => counter(prevState, action));
    }
    // Actions
    increment = () => {
      this.dispatch({ type: 'INCREMENT' });
    };
  
    decrement = () => {
      this.dispatch({ type: 'DECREMENT' });
    };
    
    render() {
      return (
        <div>
          <p>{this.state.value}</p>
          <button onClick={this.increment} style={{width:'40px'}}>+</button>
          <button onClick={this.decrement} style={{width:'40px'}}>- </button>
        </div>
      )
    }
  }

export default MyCounter01;
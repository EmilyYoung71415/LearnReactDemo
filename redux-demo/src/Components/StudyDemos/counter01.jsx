/**
 *  首先有redux的基础知识 了解action , reducer ,components的大致关系
 *  即对状态流转图有大致了解
 *  这是帮助你快速入门的例子
 *  @author yxy
 */
import React, {Component} from 'react';
import wrapWithTryCatch from 'react-try-catch-render';
import MyErrorHandler from '../../Error/error'

//reducer
const counter = (state = { value: 0 }, action={}) => {
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
    constructor(props) {
        super(props);
        this.state = {
            value:0,//counter(undefined,{})
            errorFlag:false
        }
    };
    
    dispatch(action){ 
      this.setState(prevState => counter(prevState, action));
    }
    // Actions
    increment=()=>{
      this.dispatch({ type: 'INCREMENT' });
    };
  
    decrement=()=>{//改变this指向
      this.dispatch({ type: 'DECREMENT' });
    };
    componentWillReceiveProps(nextProps){
        this.setState({errorFlag:false});//重新加载恢复正常状态
    };
    render(){
        if(this.state.value===4){
            this.setState({errorFlag:true});
            this.setState({value:3});//改正错误状态
        }
        if(this.state.errorFlag){
            throw new Error('最多只能加到3');
        }
        return (
            <div>
                <p>{this.state.value}</p>
                <button onClick={this.increment} style={{width:'40px'}}>+</button>
                <button onClick={this.decrement} style={{width:'40px'}}>- </button>
            </div>
        )
    }
  }

//export default MyCounter01;
export default wrapWithTryCatch(
    React,
    MyErrorHandler,
    {
        errorPath:'/demostep1',
        errorInfo:'最多只能加到3'
    }
)(MyCounter01);
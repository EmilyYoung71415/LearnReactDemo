import React, {Component} from 'react';
import counter from '../../Redux/Reducer/reducer';
import {minusNumber,addNumber} from '../../Redux/Action/action';

 class MyCounter extends Component {
    // State
    constructor() {
        super();
        this.state = counter(undefined, {});
    }

    dispatch(action) {
        this.setState(prevState => counter(prevState, action));
    }
    // Actions
    increment = () => {
       // this.setState(prevState => console.log(prevState));
        this.dispatch(addNumber(2));
    };
    decrement = () => {
        this.dispatch(minusNumber(-3));
    };
    render() {
        return ( 
            <div>
                <h1>简单计数器Demo</h1>
                <p>{this.state.value}</p>
                <button onClick={this.increment}>+</button>
                <button onClick={this.decrement}>-</button>
            </div>
        );
    }
}
export default MyCounter;
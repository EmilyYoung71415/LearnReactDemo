import React, {Component} from 'react';
import './App.css';

//reducer
const counter = (state = {value: 0}, action) => {
    switch (action.type) {
        // case 'INCREMENT':
        //     return {
        //         value: state.value + 1
        //     };
        // case 'DECREMENT':
        //     return {
        //         value: state.value - 1
        //     };
        case 'INCREMENT':
        case 'DECREMENT':
        return { value: state.value + action.payload.num };
        default:
            return state;
    }
}

class App extends Component {
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
        this.dispatch({
            type: 'INCREMENT',
            payload:{
                num:2
            }
        });
    };
    decrement = () => {
        this.dispatch({
            type: 'DECREMENT',
            payload:{
                num:-3
            }
        });
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

export default App;
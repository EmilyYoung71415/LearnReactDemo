import React, {Component} from 'react';
import './App.css';

//reducer
const counter = (state = {value: 0}, action) => {
    switch (action.type) {
        case 'INCREMENT':
        case 'DECREMENT':
        return { value: state.value + action.num };
        default:
            return state;
    }
}

const counterActionGenerator = (type, num) => (num) => {
    let action = { type, num : num }
    return action
}

const addNumber = counterActionGenerator('INCREMENT', null)
const minusNumber = counterActionGenerator('DECREMENT', null)
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
        // this.dispatch({
        //     type: 'INCREMENT',
        //     payload:{
        //         num:2
        //     }
        // });
        this.dispatch(addNumber(2));
    };
    decrement = () => {
        // this.dispatch({
        //     type: 'DECREMENT',
        //     payload:{
        //         num:-3
        //     }
        // });
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

export default App;
import React, {Component} from 'react';
import '../../Style/counter.css'

 class MyCounter extends Component {
    render() {
        const {  value,onIncrement, onDecrement } = this.props
        // 参数 value=> 由state计算得到
        // 方法 onIncrement onDecrement => 向外发出action
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
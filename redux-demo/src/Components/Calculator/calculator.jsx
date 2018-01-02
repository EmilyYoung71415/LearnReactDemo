import React, {Component} from 'react';
import { createStore } from 'redux'
import { connect } from 'react-redux'
import '../../Style/calcuator.css'
const KEYVALUE = [
    {value: '7'},
    {value: '8'},
    {value: '9'},
    {value: '←'},
    {value: 'C'},
    {value: '4'},
    {value: '5'},
    {value: '6'},
    {value: 'X'},
    {value: '/'},
    {value: '1'},
    {value: '2'},
    {value: '3'},
    {value: '+'},
    {value: '-'},
    {value: '0'},
    {value: '00'},
    {value: '.'},
    {value: '%'},
    {value: '='},
    {value: '('},
    {value: ')'}
];
class MyCalculator extends Component {
    constructor(props){
        super(props);
        this.state = {
            valueText: '0' 
        }
    }
    handleValueInput(data) {
        let oldState = this.state.valueText;
        let rev = this.checkClickType(oldState,data);
        let  newState = {};
        newState.valueText = rev;
        this.setState( newState)
    }
    checkClickType(oldvalue,value){
        switch (value) {
            case '=':
                //向外分发action
                this.props.equalClick();
                let result =  oldvalue + '=' + this.props.revdata;
                return result;
            case 'C':
                //删除最后一位
                oldvalue =  oldvalue.substring(0,oldvalue.length-1)
                return oldvalue;
            case '←':
                oldvalue = '0';
                return oldvalue;
            default://一般数字
                if(oldvalue === '0'){
                    oldvalue = ''
                }
                return oldvalue + value
        }
    }
    render() {
        let buttonlist = [];
        KEYVALUE.forEach(data => {
            buttonlist.push(
                <button className='div_class_button'
                    key={data.value}
                    onClick = {this.handleValueInput.bind(this,data.value)}
                >{data.value}</button>
            );
        });
        return ( 
            <div className='div_class_calculator'>
               <div className='div_class_showdatabar'>
                    <h1>简易计算器</h1>
                    <input type="text"
                        value={this.state.valueText} 
                        readOnly
                    />
                </div>
                <div className='div_class_buttonlist'>
                    {buttonlist}
                </div>
            </div>
        );
    }
}

/**
 *  @func 模块--container
 *  @desc 定义映射
 */
//将UI组件的props与redux的state映射
function mapStateToProps(state) {
    return {
        revdata: state.revdata
    }
}
  
//将UI组件的props与redux的action映射
function mapDispatchToProps(dispatch,ownProps) {
    return {
        //用户的onIncreaseClick方法与action映射([3]定义action),通过dispatch触发reducer
        equalClick: () => dispatch(getResult(ownProps))
    }
}

/**
 *  @func 模块--action
 *  @desc 
 */
const EQUEALBTN = 'EQUEALBTN'; //常规按钮
const ActionGenerator = (type, num) => (num) => {
    let action = { type, num : num }
    return action
}
const getResult = ActionGenerator(EQUEALBTN, null);


/**
 * @func 模块--connect
 */
const App = connect(
    mapStateToProps,
    mapDispatchToProps
)(MyCalculator)


/**
 *  @func 模块--reducer
 *  @desc 根据action 返回新的state
 */
function getRev(state = { revdata: 0 }, action) {
    const rev = state.revdata
    switch (action.type) {
      case EQUEALBTN:
        return { revdata:   1 }
      default:
        return state
    }
}

/**
 *  @func 模块--store
 *  @desc 以reducer生成store对象
 */
const store = createStore(getRev)



export default {
    store,
    App
};
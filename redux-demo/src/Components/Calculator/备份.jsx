import React, {Component} from 'react';
//import { createStore } from 'redux'
//import { connect } from 'react-redux'
import '../../Style/calcuator.css'
/**
 * ----MyCalculator
 *      --------ShowDataBar
 *      --------------ButtonList
 *      --------------Button
 */

 //UI组件
class Button extends Component {
    render() {
        const {keyvalue,onButtonClick} = this.props;
        return ( 
            <button className='div_class_button'
                onClick = {onButtonClick}
            >
                {keyvalue.value}
            </button>
        );
    }
}

class ButtonList extends Component {
    render() {
        const {keyvalue,onValueInput} = this.props;
        let buttonlist = [];
        keyvalue.forEach(data => {
            buttonlist.push(
                <Button keyvalue={data} key={data.value}
                    onButtonClick={() => onValueInput(data.value)}
                />
            );
        });
        return ( 
            <div className='div_class_buttonlist'>
                {buttonlist}
            </div>
        );
    }
}

//input展示数据
class ShowDataBar extends Component {
    render() {
        return ( 
            <div className='div_class_showdatabar'>
                <h1>简易计算器</h1>
                <input type="text" 
                    value={this.props.valueText}
                    readOnly
                />
            </div>
        );
    }
}


/**
 *  @desc UI组件
 *  @func 功能模块--components
 *  @param 参数两个
 *      input框的值 由顶级组件的state得到
 *      方法：按钮的点击事件 向外发出action
 */

//[1] 确定公共所有者组件
class MyCalculator extends Component {
    //[2] 在类构造器里添加实例属性 初始化state
    //[3] 将state做为prop传入需要state的子组件
    constructor(props){
        super(props);
        this.state = getNewstate(undefined,{});
        this.handleValueInput = this.handleValueInput.bind(this);
    }

    dispatch(action) {
        this.setState(prevState => getNewstate(prevState, action));
    }
    
    handleValueInput(newValue) {
        //判断当前按钮值类型
        if(newValue === '='){
            this.dispatch(equalClick(newValue));
        }else if(newValue === '←'){
            this.dispatch(backClick(newValue));
        }else if(newValue === 'C'){
            this.dispatch(clearClick(newValue));
        }else{
            this.dispatch(normalClick(newValue));
        }
    }
    render() {
        return ( 
            <div className='div_class_calculator'>
                <ShowDataBar 
                    valueText={this.state.valueText}
                />
                <ButtonList keyvalue={this.props.keyvalue}
                    onValueInput={this.handleValueInput}
                />
            </div>
        );
    }
}




/**
 *  @func 功能模块--action
 */
const EQUALBTN = 'EQUALBTN';  //等于按钮
const BACKBTN = 'BACKBTN'; //回退按钮
const CLEARBTN = 'CLEARBTN'; //清空按钮
const NORMALBTN = 'NORMALBTN'; //常规按钮
const ActionGenerator = (type, num) => (num) => {
    let action = { type, num : num }
    return action
}

const equalClick = ActionGenerator(EQUALBTN, null)
const backClick = ActionGenerator(BACKBTN, null)
const clearClick = ActionGenerator(CLEARBTN, null)
const normalClick = ActionGenerator(NORMALBTN, null)

/**
 *  @func 功能模块--reducer
 */
const getNewstate = (state = { valueText: '0' }, action) => {
    switch (action.type) {
      case EQUALBTN:
         let rev = getResult(state.valueText);
         return { valueText: rev };
      case BACKBTN:
        return { valueText: '回退一个' };
      case CLEARBTN:
        return { valueText: '0' };
      case NORMALBTN:
        if(state.valueText === '0'){
            state.valueText = ' '
        }
        return { valueText: state.valueText + action.num };
      default:
        return state;
    }
}

//计算的逻辑函数
const getResult = (stringnum) =>{
    console.log(stringnum);
    let rev = 10000;
    return  rev
}



// ReactDOM.render(
//   <Provider store={store}>
//     <App /> 
//   </Provider>,
//   document.getElementById('root')
// )
//   ReactDOM.render(
//     <MyCalculator keyvalue={KEYVALUE} />,
//     document.getElementById('container')
//   );

//keyvalue
var KEYVALUE = [
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
// export {
//     App,
//     store
// } ;
export {
    MyCalculator,
    KEYVALUE
} ;
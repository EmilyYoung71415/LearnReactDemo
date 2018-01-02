import React, {Component} from 'react';
import { createStore } from 'redux'
import { connect } from 'react-redux'
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
        //console.log(this.props)
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
        this.state = {
            valueText:'0'//等号及等号前面的字符串
        };
        this.handleValueInput = this.handleValueInput.bind(this);
    }
    handleValueInput(newValue) {
        this.setState({
            valueText: this.state.valueText + newValue
        });
    }
    render() {
        //console.log(this.props)
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
 *  @desc 定义定义映射 输入输出逻辑
 *  @func 功能模块--container
 *  将UI组件的value值[props]映射到state
 *  将UI组件的方法映射到action 通过dispatch触发action
 */

//将UI组件的props与redux的state映射
function mapStateToProps(state) { //TODO:将所有的function改为箭头函数
    return {
        value: state.value
    }
}
  
//将UI组件的props与redux的action映射
function mapDispatchToProps(dispatch) {
    //判断当前按钮的值 根据不同的值来确定不同按钮的分发action
    //console.log(onButtonClick)
    return {
        //用户的按钮点击onButtonClick方法与action映射([3]定义action),通过dispatch触发reducer
        //onButtonClick: () => dispatch(increaseAction)
        //dispatch(这里面的action是事先定义好的)
    }
}

/**
 *  @desc 定义action 
 *  定义action 纯函数 输入什么输出什么 收到的action返回一个type字段
 *  dispatch拿着这个type字段去找reducer，reducer根据不同type匹配不同的动作 并最终返回一个新state
 *  @func 功能模块--action
 *  依据按钮的不同值来确定按钮的actiontype [之前是加减对应不同的函数，不同的函数即对应不同的type]
 *  @param 两个action：
 *         1.常规按钮 NORMALBTN //按钮值增加到input框中
 *         2.等于按钮 EQUALBTN //按钮值添加到input框并计算结果,最后把结果放到input框中
 */

const NORMALBTN = 'NORMALBTN';
const EQUALBTN = 'EQUALBTN';
const normalAction = { type: NORMALBTN }
const equalAction = { type: EQUALBTN }

/**
 *  @desc 给UI组件用connect()方法附上输入输出逻辑[逻辑],生成一个容器组件App
 *  @func 功能模块--container
 */

const App = connect(
    mapStateToProps,
    mapDispatchToProps
)(MyCalculator)



/**
 *  @desc 用户触发什么action对应返回一个经过reducer处理的新state，不同type对应不同的处理方式
 *  @func 功能模块--reducer
 */
function convertType(state ={value:0}, action) {
    switch (action.type) {
    case NORMALBTN:
        return {
            value: state.value
         };
    case EQUALBTN:
        return{ 
            value: state.value + '222'   //测试 
        }; 
    default:
        return state
    }
  }

/**
 *  @desc 以reducer做为传入值生成一个store对象
 *  @func 功能模块--store
 */
const store = createStore(convertType)

/**
 *  最后
 *  @desc 使用Provider组件在根组件外面包一层 App及其子组件就可以拿到state了
 */

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
    {value: '='}
];
// export {
//     App,
//     store
// } ;
export {
    MyCalculator,
    KEYVALUE
} ;
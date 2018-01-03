import React, {Component} from 'react';
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
    {value: '*'},
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
                let resultbefore = oldvalue + ' =' ; 
                //向外分发action
                this.props.equalClick(oldvalue);
                return resultbefore;
            case '←':
                //删除最后一位
                oldvalue =  oldvalue.substring(0,oldvalue.length-1)
                return oldvalue;
            case 'C':
                oldvalue = '0';
                return oldvalue;
            case '+':
            case '-':
            case '/':
            case '*':
            case '(':
            case ')':
                return oldvalue + ' ' +value + ' ';
            default://一般数字
                if(oldvalue === '0'){
                    oldvalue = ''
                }
                return oldvalue + value
        }
    }
    render() {
        const {revdata} = this.props;
        let buttonlist = [];
        KEYVALUE.forEach(data => {
            buttonlist.push(
                <button className='div_class_button'
                    key={data.value}
                    onClick = {this.handleValueInput.bind(this,data.value)}
                >{data.value}</button>
            );
        });
        //取当前input框字符串的最后一个字符 如果是等于符号则 运算过程+结果
        let str = this.state.valueText;
        let laststr = str.charAt(str.length - 1)
        let curValue = str;
        if(laststr === '='){
            curValue = str +' '+revdata;
        }
        return ( 
            <div className='div_class_calculator'>
               <div className='div_class_showdatabar'>
                    <h1>简易计算器</h1>
                    <input type="text"
                        value={curValue} 
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


export default MyCalculator;
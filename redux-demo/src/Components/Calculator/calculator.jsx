import React, {Component} from 'react';
import wrapWithTryCatch from 'react-try-catch-render';
import MyErrorHandler from '../../Error/error'
import '../../Style/calcuator.css'
const KEYVALUE = [
    {value: '7',type:'number'},
    {value: '8',type:'number'},
    {value: '9',type:'number'},
    {value: '←',type:'back'},
    {value: 'C',type:'clear'},
    {value: '4',type:'number'},
    {value: '5',type:'number'},
    {value: '6',type:'number'},
    {value: '*',type:'operator'},
    {value: '/',type:'operator'},
    {value: '1',type:'number'},
    {value: '2',type:'number'},
    {value: '3',type:'number'},
    {value: '+',type:'operator'},
    {value: '-',type:'operator'},
    {value: '0',type:'number'},
    {value: '00',type:'number'},
    {value: '.',type:'point'},
    {value: '%',type:'operator'},
    {value: '=',type:'equal'},
    {value: '(',type:'brackets'},
    {value: ')',type:'brackets'}
];
class MyCalculator extends Component {
    constructor(props){
        super(props);
        this.state = {
            valueText: '0',
            equalFlag:false,//当前计算状态:计算后或计算前
            errorFlag:false
        }
    }
    handleValueInput(data) {
        let oldState = this.state.valueText;
        let rev = this.checkClickType(oldState,data);
        this.setState({valueText:rev})
    }
    checkClickType(oldvalue,data){
        let initFlag = oldvalue === '0'&&data.type!=='point';//初次输入且不打算输入小数
        let calAfterFlag = this.state.equalFlag===true;//计算后
        switch (data.type) {
            case 'equal':
                let resultbefore = oldvalue + ' =' ; 
                this.props.equalClick(oldvalue);//向外分发action
                this.setState({equalFlag:true});
                return resultbefore;
            case 'back':
                oldvalue =  oldvalue.substring(0,oldvalue.length-1)//删除最后一位
                return oldvalue;
            case 'clear':
                oldvalue = '0';
                return oldvalue;
            case 'operator'://操作符
                if(calAfterFlag){//如果计算后
                    let result = this.props.revdata;
                    this.setState({equalFlag:false})
                    return result + ' ' + data.value + ' ';
                }
                //不能出现连续操作符的情况      
                let valueArr = oldvalue.split(' ');
                if(valueArr[valueArr.length-1]===''&&valueArr[valueArr.length-2]!==')'){
                    //删除操作符及左右的空格
                    oldvalue =  oldvalue.substring(0,oldvalue.length-3)
                    return  oldvalue + ' ' + data.value + ' ';
                }
                return oldvalue + ' ' + data.value + ' ';
            case 'brackets'://括号
                return oldvalue + ' ' + data.value + ' ';
            default://一般数字
                if(initFlag||calAfterFlag){
                    oldvalue = ''
                }
                if(calAfterFlag){//开始新一轮计算
                    this.setState({equalFlag:false})
                }
                if(data.value==='0'){
                    let valueArr = oldvalue.split(' ');
                    //如果前面的符号为/
                    if(valueArr[valueArr.length-2]==='/'){
                        this.setState({errorFlag:true});
                        data.value = ''
                    }
                }
                return oldvalue + data.value
        }
    }
    render() {
        const {revdata} = this.props;
        if(this.state.errorFlag){
            throw new Error('错误');
            this.setState({errorFlag:false});
        }
        let buttonlist = [];
        KEYVALUE.forEach(data => {
            buttonlist.push(
                <button className='div_class_button'
                    key={data.value}
                    onClick = {this.handleValueInput.bind(this,data)}
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

export default wrapWithTryCatch(React, MyErrorHandler, {error: "被除数不能为0!"})(MyCalculator);
//export default MyCalculator;
import React, {Component} from 'react';
import wrapWithTryCatch from 'react-try-catch-render';
import MyErrorHandler from '../../Error/error';
import getSpValue from './getSpValue';
import '../../Style/calcuator.css'
//标准 standard
const KEYVALUEST = [
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
    {value: ')',type:'brackets'},
    {value: '历史',type:'history'},
    {value: '展开 | 收缩',type:'change'}
];
//科学 science
const KEYVALUESC = [
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
    {value: 'π',type:'number'},
    {value: 'e',type:'number'},
    {value: '.',type:'point'},
    {value: '(',type:'brackets'},
    {value: ')',type:'brackets'},
    {value: '%',type:'spoperator'},
    {value: '√',type:'spoperator'},
    {value: 'x²',type:'spoperator'},
    {value: 'sin',type:'spoperator'},
    {value: 'cos',type:'spoperator'},
    {value: 'tan',type:'spoperator'},
    {value: 'ln',type:'spoperator'},
    {value: '历史',type:'history'},
    {value: '展开 | 折叠',type:'change'},
    {value: '=',type:'equal'}
];
class MyCalculator extends Component {
    constructor(props){
        super(props);
        this.state = {
            valueText: '0',
            equalFlag:false,//当前计算状态:计算后或计算前
            errorFlag:false,//是否有抛出错误
            historyArr:[],//历史记录 时间+计算值
            clearHisFlag:false//当前是否清楚历史记录
        }
    }
    handleValueInput(data) {
        let oldState = this.state.valueText;
        let rev = this.checkClickType(oldState,data);
        this.setState({valueText:rev})
    }
    checkClickType(oldvalue,data){
        this.setState({clearHisFlag:false});//每次新按键就是一次重新记录
        let initFlag = oldvalue === '0'&&data.type!=='point';//初次输入且不打算输入小数
        let calAfterFlag = this.state.equalFlag===true;//计算后
        switch (data.type) {
            case 'equal':
                let resultbefore = oldvalue + ' =' ; 
                let prevresult = getSpValue(oldvalue);//预处理特殊操作符
                this.props.equalClick(prevresult);//向外分发action
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
            case 'spoperator'://运算符与数字不分离  //'^(2)','%','√','sin','cos','tan','lg'
                // 特殊运算符 sin cos tan lg √ 初始化时清空数字
                let spFlag =  data.value !=='^(2)'&&data.value !=='%';
                if(initFlag&&spFlag){
                    return data.value
                }
                if(data.value === 'x²'){
                    let temp = data.value;
                    temp = '^(2)';
                    return oldvalue + temp;
                }
                return oldvalue + data.value ;
            case 'brackets'://括号
                return oldvalue + ' ' + data.value + ' ';
            default://一般数字
                if(initFlag||calAfterFlag){
                    oldvalue = ''
                }
                if(calAfterFlag){//开始新一轮计算
                    this.setState({equalFlag:false})
                }
                if(data.value==='0'||data.value==='00'){
                    let valueArr = oldvalue.split(' ');
                    //如果前面的符号为/
                    if(valueArr[valueArr.length-2]==='/'){
                        this.setState({errorFlag:true});
                        return '0';//直接清零
                    }
                }
                return oldvalue + data.value
        }
    }
    //捕获错误返回该组件之后  更新错误状态
    componentWillReceiveProps(nextProps){
        this.setState({errorFlag:false});
    }
    //生成按钮列表
    initButtonList=(list,value)=>{
        value.forEach(data => {
            list.push(
                <button className='div_class_button'
                    key={data.value}
                    onClick = {this.handleValueInput.bind(this,data)}
                >{data.value}</button>
            );
        });
        return list;
    }
    //生成历史记录列表
    initHistoryList=(list,value)=>{
        if(value == null){//清空记录
            this.setState({historyArr:[],clearHisFlag:true});
            list = [];
            return list;
        }
        value.forEach(data=>{
            list.push(
                <div key={data.time}>
                    <i>{data.time}</i>
                    <p>{data.value}</p>
                </div>
            )
        })
        return list;
    }
    render() {
        const {revdata} = this.props;
        let buttonlist = [];//按钮列
        let historyList = [];//历史记录列
        if(this.state.errorFlag){
            throw new Error('除数不能为零！');
        }
        //初始化值
        buttonlist = this.initButtonList(buttonlist,KEYVALUESC)
        //取当前input框字符串的最后一个字符 如果是等于符号则 运算过程+结果
        let str = this.state.valueText;
        let laststr = str.charAt(str.length - 1)
        let curValue = str;
        if(laststr === '='){
            curValue = str +' '+revdata;
            if(!this.state.clearHisFlag){
                //存放历史信息
                let myDate =  new Date();
                let time = myDate.toLocaleString();
                this.state.historyArr.push({time:time,value:curValue});
            }
        }
        historyList = this.initHistoryList(historyList,this.state.historyArr)
        return (
            <div className='div_class_All'>
                <div className='div_class_calculator'>
                    <div className='div_class_showdatabar'>
                        <h1>简易计算器</h1>
                        <input type="text"
                            value={curValue} 
                            readOnly
                        />
                    </div>
                    <div className='div_class_choosetype'>
                        <span >标准</span>
                        <span>|</span>
                        <span className='active'>科学</span>
                    </div>
                    <div className='div_class_buttonlist'>
                        {buttonlist}
                    </div>
                </div>
                <div className='div_class_historybox'>
                    <p>折叠</p>
                    <div className='div_class_historydetail'>
                        <span>历史计算</span>
                        <div>
                            {historyList}
                        </div>
                        <p className='btn'
                             onClick={this.initHistoryList.bind(this,historyList,null)}
                            >清空历史记录</p>
                    </div>
                    
                </div>
            </div> 
        );
    }
}

export default wrapWithTryCatch(
    React,
    MyErrorHandler,
    {
        errorPath:'/calculator',
        errorInfo:'除数不能为零！'
    }
)(MyCalculator);
//export default MyCalculator;
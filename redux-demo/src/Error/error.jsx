/**
 * @desc 特殊组件:专门用来处理错误
 * @func 捕捉错误
 *  用法:将需要抛出错误的UI组件和该组件混合
 *  作用：捕捉到错误之后则展示这个界面
 */
import React from 'react';
import MyCalculator from '../Components/Calculator/calculator';
class MyErrorHandler extends React.Component {
    render(){
        let errorMessage = this.props.error;        
        if(errorMessage){
            alert(errorMessage)   
        }
        return (
            <MyCalculator/>
        ); 
    }
}
export default MyErrorHandler;

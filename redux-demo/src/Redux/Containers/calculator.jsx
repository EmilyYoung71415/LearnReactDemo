/**
 *  @author yxy
 *  @desc 计算器容器组件
 *  @date 2017/1/3
 */
import { connect } from 'react-redux'
import MyCalculator from '../../Components/Calculator/calculator'
import {getResult} from '../Action/action'

const mapStateToProps = (state) => {
    return {
        revdata: state.getRev.revdata
    }
};  

const mapDispatchToProps = (dispatch) => {
    return {
        equalClick: (value) => dispatch(getResult(value))
    }
};

//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default connect(mapStateToProps, mapDispatchToProps)(MyCalculator);




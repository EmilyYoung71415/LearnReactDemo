/**
 *  @author yxy
 *  @desc 容器组件 实现映射
 *  @date 2017/12/30
 */
import { connect } from 'react-redux'
import MyCounter from '../Components/Counter/counter'
import {addNumber,minusNumber} from '../Redux/Action/action'

// 将 Redux state 映射到 component props
const mapStateToProps = (state) => {
    //console.log(state.default.count)
    return {
        value:state.default.count
    }
};
// 将 Redux actions 映射到 component props 
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onIncrement: () => dispatch(addNumber(2)),
        onDecrement: () => dispatch(minusNumber(-3))
    }
};

//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default connect(mapStateToProps, mapDispatchToProps)(MyCounter)
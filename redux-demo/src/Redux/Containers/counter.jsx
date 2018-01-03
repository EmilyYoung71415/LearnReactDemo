/**
 *  @author yxy
 *  @desc 以UI组件填充逻辑生成容器组件
 *  @date 2017/12/30
 */
import { connect } from 'react-redux'
import MyCounter from '../../Components/Counter/counter'
import {addNumber,minusNumber} from '../Action/action'

/**计算器**/
// 将 Redux state 映射到 component props
const mapStateToPropsCounter = (state) => {
    return {
        value:state.counter.count
    }
};
// 将 Redux actions 映射到 component props 
const mapDispatchToPropsCounter = (dispatch) => {
    return {
        onIncrement: () => dispatch(addNumber(2)),
        onDecrement: () => dispatch(minusNumber(-3))
    }
};

//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default connect(mapStateToPropsCounter, mapDispatchToPropsCounter)(MyCounter);




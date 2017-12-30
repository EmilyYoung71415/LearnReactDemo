/**
 *  @author yxy
 *  @desc reducer 根据不同动作判断做出相应改变    
 *  @date 2017/12/29
 */
import {INCREMENT, DECREMENT} from '../Action/actionType'

//定义reducer函数
const counter = (state = {count: 0}, action) => {
    const count = state.count
    switch (action.type) {
        case INCREMENT:
        case DECREMENT:
        return { 
            count: count + action.num 
        };
        default:
            return  state;
    }
}
export default counter;
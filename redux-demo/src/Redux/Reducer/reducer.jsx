/**
 *  @author yxy
 *  @desc reducer 根据不同动作判断做出相应改变    
 *  @date 2017/12/29
 */
import {INCREMENT, DECREMENT,EQUEALBTN} from '../Action/actionType'
import suffixExpression from '../../Components/Calculator/getAllValue'


//计数器reducer函数
export const counter = (state = {count : 0}, action) => {
    switch (action.type) {
        case INCREMENT:
        case DECREMENT:
        return { 
            ...state,
            count:state.count + action.num 
        };
        default:
            return  {...state};
    }
}


//计算器reducer函数
export const getRev = (state = {revdata:0}, action) =>{
    //action.num即是等号前面的字符串
    switch (action.type) {
      case EQUEALBTN:
        let rev = suffixExpression(action.num)
        return {
            ...state,
            revdata:rev
        }
      default:
        return {...state}
    }
}

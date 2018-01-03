/**
 * @author yxy
 * @desc action 数据交互 状态改变统一的action动作描述
 * @date 2017/12/29
 */
import * as counterType from './actionType'

/**
 * 定义一个函数来生成Action
 * @param type,num
 * @returns   { type, num : num }
*/
const ActionGenerator = (type, num) => (num) => {
    let action = { type, num : num }
    return action
}
//计数器
export const addNumber = ActionGenerator(counterType.INCREMENT, null);
export const minusNumber = ActionGenerator(counterType.DECREMENT, null);
//计算器
export const getResult = ActionGenerator(counterType.EQUEALBTN, null);
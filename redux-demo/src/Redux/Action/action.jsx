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
const counterActionGenerator = (type, num) => (num) => {
    let action = { type, num : num }
    return action
}
export const addNumber = counterActionGenerator(counterType.INCREMENT, null)
export const minusNumber = counterActionGenerator(counterType.DECREMENT, null)
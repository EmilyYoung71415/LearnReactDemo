/**
 *  @author yxy
 *  @desc store 负责具体执行action动作
 *  @date 2017/12/29
 */

import {createStore} from 'redux';
import counter from '../Reducer/reducer';
//创建一个store存放所有数据
var store = createStore(counter);
 export default store;
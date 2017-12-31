/**
 *  @author yxy
 *  @desc store 
 *  @date 2017/12/30
 */

import {createStore, combineReducers} from 'redux';
import * as reducer from '../Reducer/reducer';

//使用createStore()创建一个store用来存储reducer方法处理的状态数据
let store = createStore(
    //使用redux的combineReducers方法将所有reducer打包起来
    //在进行合并后，计数器的数值将被转移到`state.counter`中。
    combineReducers(reducer)
);

export default store;   
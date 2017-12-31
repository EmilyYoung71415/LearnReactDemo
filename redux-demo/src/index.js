import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import './index.css';
//import store from './Redux/Store/store';
//import route from './Router/router';//路由配置
//import {store,App} from './Components/StudyDemos/reduxexample';
//import {PRODUCTS,FilterableProductTable} from './Components/StudyDemos/thinkinReactdemo-1';
//import {PRODUCTS,FilterableProductTable} from './Components/StudyDemos/thinkinReactdemo-2';
import {PRODUCTS,FilterableProductTable} from './Components/StudyDemos/thinkinReactdemo-3';
import registerServiceWorker from './registerServiceWorker';

// store.subscribe(() => { //监听state变化
//     console.log(store.getState())
// });
// ReactDOM.render(
//     <Provider store={store}>
//         {/* <App/> */}
//         {route}
//     </Provider>,
//     document.getElementById('root')
// );
   
ReactDOM.render(
    <FilterableProductTable products={PRODUCTS} />,
    document.getElementById('root')
);

registerServiceWorker();

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import './index.css';
import store from './Redux/Store/store';
//import App from './Containers/container'
import route from './Router/router';//路由配置
import registerServiceWorker from './registerServiceWorker';

store.subscribe(() => { //监听state变化
    console.log(store.getState())
});
ReactDOM.render(
    <Provider store={store}>
        {route}
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();

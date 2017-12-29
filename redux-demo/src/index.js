import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import MyCounter from './Components/Counter/counter'
import registerServiceWorker from './registerServiceWorker';

//ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<MyCounter />, document.getElementById('root'));
registerServiceWorker();

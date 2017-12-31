import React from 'react';
import {BrowserRouter as Router,Route,NavLink as Link} from 'react-router-dom';

import MyCounter from '../Redux/Containers/container';
import MyCalculator from '../Components/Calculator/calculator';
import Counter01 from '../Components/StudyDemos/counter01';

const RouteConfig = (
    <Router>
    <div>
        <ul>
            <h3>一步一步改造计数器react+redux</h3>
            <li><Link to="/demostep1" activeStyle={{ color:'red' }}>1.模拟redux工作流</Link></li>
            <h3>综合例子[分层后]</h3>
            <li><Link to="/counter" activeStyle={{ color:'red' }}>1.计数器</Link></li>
            <li><Link to="/calculator" activeStyle={{ color:'red' }}>2.简易计算器</Link></li>
        </ul>
        <Route path="/demostep1" component={Counter01}/>
        <Route path="/counter" component={MyCounter}/>
        <Route path="/calculator" component={MyCalculator}/>
    </div>
    </Router>
);
export default RouteConfig;
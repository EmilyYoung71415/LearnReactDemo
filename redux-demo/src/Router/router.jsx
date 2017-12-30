import React from 'react';
import {BrowserRouter as Router,Route,NavLink as Link} from 'react-router-dom';

import MyCounter from '../Containers/container';
import MyCalculator from '../Components/Calculator/calculator';
const RouteConfig = (
    <Router>
    <div>
        <ul>
            <li><Link to="/counter" activeStyle={{ color:'red' }}>计数器</Link></li>
            <li><Link to="/calculator" activeStyle={{ color:'red' }}>简易计算器</Link></li>
        </ul>
        <Route exact path="/counter" component={MyCounter}/>
        <Route path="/calculator" component={MyCalculator}/>
    </div>
    </Router>
);
export default RouteConfig;
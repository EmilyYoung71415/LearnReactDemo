import React from 'react';
import {BrowserRouter as Router,Route,NavLink as Link} from 'react-router-dom';
import '../Style/route.css'
import MyCounter from '../Redux/Containers/counter';
import MyCalculator from '../Redux/Containers/calculator';
import Counter01 from '../Components/StudyDemos/counter01';
//import ErrorBoundary from '../Error/errorboundary';

const active = {background:'#045757',color:'#fff',textDecoration:'none'};
const RouteConfig = (
    <Router>
        <div>
            <ul className='div_class_ul'>
                <span>一步一步学习react+redux</span>
                <li><Link to="/demostep1" activeStyle={active}>1.模拟redux工作流计数器</Link></li>
                <span>综合实例[分层后]</span>
                <li><Link to="/counter" activeStyle={active}>1.加减计数器</Link></li>
                <li><Link to="/calculator" activeStyle={active}>2.简易计算器</Link></li>
            </ul>
            <Route path="/demostep1" component={Counter01}/>
            <Route path="/counter" component={MyCounter}/>
            <Route path="/calculator" component={MyCalculator} exact/>
            
        </div>
    </Router>
);
export default RouteConfig;
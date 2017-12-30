/**
 *  react-router-4.0配置
        BrowserRouter/Route
        Link/NavLink
        match
    安装：
    npm install --save react-router-dom
    index.js:
        import { BrowserRouter as Router } from 'react-router-dom'
    1.路由
    Router/Route
    BrowserRouter组件已经内置了对浏览器的history支持,且没有＃
    Route即路由组件，一般接受两个参数，path以及component来指定路由对应的url以及要渲染的组件
        btw：exact属性 精确定位
    2.导航：
    Link/NavLink (react-router提供的现成的导航组件)
    Link是最基本的导航组件：to作为参数指向其连接的路由
    import { BrowserRouter as Router，Route,Link } from 'react-router-dom'
    <Router>
        <div>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/blog">Blog</Link></li>
            </ul>
            <Route exact path="/" component={Home}/>
            <Route path="/blog" component={Blog}/>
        </div>
    </Router>

    升级版： 高亮选中的tab
    NavLink 附加了导航激活的相关属性
    import { BrowserRouter as Router，Route,NavLink as Link } from 'react-router-dom'
    <ul>
        <li><Link activeStyle={{ fontWeight: 'bold' }} to="/">Home</Link></li>
        <li><Link activeStyle={{ fontWeight: 'bold' }} to="/blog">Blog</Link></li>
    </ul>

    
 */
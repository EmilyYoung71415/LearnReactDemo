# 深入理解React

## react工作原理

+ UI = F(data)
+ 一切均是组件
+ 声明式编程


组件可以只负责副作用
```javascript
//每隔多久向后台发个请求
class HeartBeat extends React.Component {
  render() {
    return null;
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      fetch('/api/v1/heartbeat');
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }
}
```

创建高阶组件(HoC，Higher-Order Component)

```javascript
const HoC = (WrappedComponent) => {
    const WrappingComponent = (props) => (
        <div className="foo">
            <WrappedCompoent {...props} />
        </div>
    );
    return WrappingComponent;
};


const HoC = (WrappedComponent) => {
    class WrappingComponent extends WrappendComponent {
        render() (
            const {user, ...otherProps} = this.props;
            this.props = otherProps;
            return super.render();
        }
    }
    return WrappingComponent;
};



const HoC = (WrappedComponent, LoginView) => {
    const WrappingComponent = () => {
         const {user} = this.props;  
         if (user) {
            return <WrappedComponent {...this.props} />
         } else {
            return <LoginView {...this.props} />
         }
    };
    return WrappingComponent;
};
```

hoc常见应用场景：
    一些功能可以用在不同的组件类里

react 组件通讯：
+ 父子
    + props 父给子 子给父 回调
    + ref(不推荐)
+ 兄弟
    + 父作为桥梁
+ any
    + 全局变量
    + context--相当于全局变量

数据的唯一性：保证数据源的唯一性

尽量减少无状态组件：为了将数据集中管理。

表单类组件数据访问
+ 受控组件
+ 直接使用ref

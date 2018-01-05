/**
 *  @desc 错误边缘
 *  @func 捕获其任意子组件下的错误
 */
import  {Component} from 'react';
class ErrorBoundary extends Component {
    constructor(props) {
      super(props);
      this.state = { error: null, errorInfo: null };
    }   
    componentDidCatch(error, errorInfo) {
      // Catch errors in any components below and re-render with error message
      console.log(error);
      console.log(errorInfo);
    //   this.setState({
    //     error: error,
    //     errorInfo: errorInfo
    //   })
    }
    
    render() {
      //fallback组件
      alert('最多只能加到5')
    //   if (this.state.error) {
    //     alert('最多只能加到5')
    //   }
      return this.props.children;
    }  
  }
  export default ErrorBoundary;
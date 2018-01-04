import wrapWithTryCatch from 'react-try-catch-render'
import React from 'react';
class MyErrorHandler extends React.Component {
    render(){
        let a = this.props.error;
        alert(a)
        // return (
        //     // <div className="terrible-error">{this.props.error}</div>
        //     alert(a)
        // );
        return (
             <div className="terrible-error">{this.props.error}</div>
            //alert(a)
        );
    }
}

class MyComponent extends React.Component {
    render(){
        throw new Error('Something went terribly worng inside this render');
        return <div>Hello</div>;
    }
}
export default wrapWithTryCatch(React, MyErrorHandler, {error: "Some custom error message!"})(MyComponent);
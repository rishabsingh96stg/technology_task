import React, { Component } from 'react';

class Layout extends Component {
    constructor(props){
        super(props);
        this.state={
            data:""
        }
    }
    render() {
        
        return (
            <React.Fragment>
             { this.props.children}
            </React.Fragment>
        )
    }
}
export default Layout
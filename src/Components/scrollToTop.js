import React, { Component } from "react";
import { withRouter } from "react-router-dom";
class ScrollToTop extends Component {
    componentDidUpdate(prevProps) {
        console.log("scroller")
        if (
            this.props.location !== prevProps.location &&
            this.props.location.state == undefined
        ) {
            window.scrollTo(0, 0);
        }
    }
    render() {
        return this.props.children;
    }
}
export default withRouter(ScrollToTop);
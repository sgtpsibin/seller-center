import React, {Component} from 'react';
import '../../static/style/main.scss';


class Layout extends Component {
    render() {
        return(
            <>
            {this.props.children}
            </>
        );

    }
}
export default Layout;
import React from 'react';

class NewOrder extends React.PureComponent<{oid:string,query:any}> {
    static async getInitialProps({query}) {
        return{query}
    }
    render() {
        // console.log(this.props.query)
        return(
            <h1>ok</h1>
        );
    }
}
export default NewOrder;
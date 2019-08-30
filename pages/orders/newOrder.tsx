import React from 'react';

class NewOrder extends React.PureComponent<{oid:string,query:any}> {
    static getInitialProps({query}) {
        console.log(query);
        
        return{query};

    }
    render() {
        return(
            <h1>ok</h1>
        );
    }
}
export default NewOrder;
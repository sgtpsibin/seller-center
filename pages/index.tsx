import React from 'react';
import { connect } from 'react-redux';
import {Page,Card,Icon} from '@shopify/polaris';
import Link from 'next/link';
import {
  OrdersMajorMonotone,
  PaymentsMajorMonotone
} from '@shopify/polaris-icons';

import AppLayout from '../components/library/layout';

class Index extends React.Component<{hasAuth:boolean,orders:any,fetchOrders:any}> {

  componentDidMount() {
    if(this.props.orders.length===0) this.props.fetchOrders();
  }

  render() {
    const  renderHomePage = (
      <AppLayout title="SELLER CENTER">        
      <Page title=''>
        <div className="app-index">
          <Link href='/orders'>
            <a>
              <Card title='' sectioned subdued>
                <div className="order-notifications">
                  <Icon source={OrdersMajorMonotone} color="orange"/>
                  <p><b>{this.props.orders.length||'__'} orders</b> to fulfill</p>
                </div>
                <hr/>
                <div className="order-notifications">
                  <Icon source={PaymentsMajorMonotone} color="orange"/>
                  <p><b>{this.props.orders.length||'__'} payments</b> to capture</p>
                </div>
              </Card>
            </a>
          </Link>
        </div>
      </Page>      
    </AppLayout>
    );
   const indexPage =  renderHomePage ;    
    return(
      <>
        {indexPage}
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    orders: state.orders,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrders: () => dispatch({type:'REQUEST_ORDERS'})
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Index);

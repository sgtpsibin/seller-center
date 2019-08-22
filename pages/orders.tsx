import React from 'react';
import { Page } from '@shopify/polaris';

import AppLayout from '../components/library/layout';

class Orders extends React.Component {

  
  render() {
    
    return(
    <AppLayout title="Quản lý đơn hàng">  
      <Page title="Đơn hàng">
        <p>PageContent</p>
      </Page>       
    </AppLayout>
    );
  }
}
export default Orders;

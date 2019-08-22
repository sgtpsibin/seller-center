import React from 'react';
import {Page} from '@shopify/polaris';

import AppLayout from '../components/library/layout';

class CustomerPage extends React.Component {
  
  render() {
    
    return(
    <AppLayout title="Quản lý khách hàng">  
      <Page title="Khách hàng">
        <p>Page Content</p>
      </Page>       
    </AppLayout>
    );
  }
}
export default CustomerPage;

import React, { Component } from 'react';
import {Page} from '@shopify/polaris';

import AppLayout from '../components/library/layout';

class Draft_Orders extends Component {
  
  render() {
    
    return(
    <AppLayout>  
      <Page title="Draft Orders">
        <p>PageContent</p>
      </Page>       
    </AppLayout>
    );
  }
}
export default Draft_Orders;

import React from 'react';
import {Page} from '@shopify/polaris';

import AppLayout from '../../components/library/layout';



class Inventory extends React.Component {
    
  render() {    
    return(
    <AppLayout title="Sản phẩm của bạn">  
      <Page title="Sản phẩm">
        <p>PageContent</p>
      </Page> 
    </AppLayout>
    );
  }
}
export default Inventory;

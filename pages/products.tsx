import React from 'react';
import {Page} from '@shopify/polaris';

import AppLayout from '../components/library/layout';



class Products extends React.Component {
    
  render() {
    
    return(
    <AppLayout>  
      <Page title="Sản phẩm">
        <p>PageContent</p>
      </Page> 
      
    </AppLayout>
    );
  }
}
export default Products;

import React from 'react';
import {Page} from '@shopify/polaris';

import AppLayout from '../components/library/layout';



class Index extends React.Component<{userAgent:any}> {

  static async getInitialProps({ req }) {  
    return { userAgent:'23' }
  }

  
  render() {
    
    return(
    <AppLayout>  
      <Page title="Test">
        <p>PageContent</p>
      </Page> 
      
    </AppLayout>
    );
  }
}
export default Index;

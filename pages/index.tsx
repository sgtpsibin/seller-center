import React from 'react';
import {Page} from '@shopify/polaris';


import TopBar from '../components/app/topbar';
import Layout1 from '../components/library/layout';



class Index extends React.Component<{userAgent:any}> {

  static async getInitialProps({ req }) {  
    return { userAgent:'23' }
  }

  
  render() {
    
    return(
    <Layout1 title="Quản lý bán hàng">
      
      <Page title="OK" singleColumn>       
        <p>content</p>
      </Page>
      
  
    </Layout1>
    );
  }
}

export default Index;
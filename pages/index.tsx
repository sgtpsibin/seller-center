import React from 'react';
import {AppProvider, Page, Card, Button} from '@shopify/polaris';

import TopBar from '../components/app/topbar';
import Layout from '../components/library/layout';



class Index extends React.Component<{userAgent:any}> {

  static async getInitialProps({ req }) {  
    return { userAgent:'23' }
  }

  
  render() {
    
    return(
    <Layout>
      <TopBar />
      <AppProvider>        
      <Page title="Example app">
        <Card sectioned>
          <Button onClick={() => alert('Button clicked!')}>Example button</Button>
        </Card>
      </Page>
    </AppProvider>
    </Layout>
    );
  }
}

export default Index;
import React from 'react';
import {Page,Card,Icon} from '@shopify/polaris';
import Link from 'next/link';
import {
  OrdersMajorMonotone,
  PaymentsMajorMonotone
} from '@shopify/polaris-icons';

import AppLayout from '../components/library/layout';

class Index extends React.Component<{hasAuth:boolean}> {

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
                  <p><b>23 orders</b> to fullfill</p>
                </div>
                <hr/>
                <div className="order-notifications">
                  <Icon source={PaymentsMajorMonotone} color="orange"/>
                  <p><b>29 payments</b> to capture</p>
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
export default Index;

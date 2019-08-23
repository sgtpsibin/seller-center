import React from 'react';
import { Page } from '@shopify/polaris';
import { connect } from 'react-redux';

import AppLayout from '../components/library/layout';

class Orders extends React.Component<{user:any}> {

  
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

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}
export default connect(mapStateToProps)(Orders);

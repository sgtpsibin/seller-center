import React from 'react';
import { Page, Tabs, Card } from '@shopify/polaris';
import { connect } from 'react-redux';

import AppLayout from '../components/library/layout';
import OrderResourceList from '../components/app/resourceList/Orders';

class Orders extends React.Component<{user:any}> {

  state = {
    tabSelected: 0
  };

  handleTabChange = (selectedTabIndex) => {
    this.setState({tabSelected: selectedTabIndex});
  };
  
  render() {

    const {tabSelected} = this.state;
    
    const tabs = [
      {
        id: 'all-customers',
        content: 'All',
        accessibilityLabel: 'All customers',
        panelID: 'all-customers-content',
      },
      {
        id: 'accepts-marketing',
        content: 'Accepts marketing',
        panelID: 'accepts-marketing-content',
      },
      {
        id: 'repeat-customers',
        content: 'Repeat customers',
        panelID: 'repeat-customers-content',
      },
      {
        id: 'prospects',
        content: 'Prospects',
        panelID: 'prospects-content',
      },
    ];
    return(
    <AppLayout title="Quản lý đơn hàng">  
      <Page 
        title="Đơn hàng"
        breadcrumbs={[{content: 'Trang Chủ', url: '/'}]}
      >
        <Card>
          <Tabs tabs={tabs} selected={tabSelected} onSelect={this.handleTabChange}>
            <Card.Section title={tabs[tabSelected].content}>
              <OrderResourceList/>
            </Card.Section>
          </Tabs>
        </Card>
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

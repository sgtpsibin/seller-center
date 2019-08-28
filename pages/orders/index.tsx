import React from 'react';
import { Page, Tabs, Card } from '@shopify/polaris';
import { connect } from 'react-redux';

import AppLayout from '../../components/library/layout';
import OrderResourceList from '../../components/app/resourceList/Orders';

type Props = {user:any,fetchOrders:any,orders?:any};

class Orders extends React.Component<Props> {


  componentDidMount() {
    if(this.props.orders.length===0) this.props.fetchOrders();
  }

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
        id: 'all-orders',
        content: 'All',
        accessibilityLabel: 'All orders',
        panelID: 'all-orders',
      },
      {
        id: 'open-orders',
        content: 'Open',
        panelID: 'open-orders',
      },
      {
        id: 'unfulfilled-and-partially-fulfilled',
        content: 'Unfulfilled and partially fulfilled',
        panelID: 'unfulfilled-and-partially-fulfilled',
      },
      {
        id: 'unpaid',
        content: 'Unpaid',
        panelID: 'unpaid',
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
                <OrderResourceList/>
            </Tabs>
          </Card>
        </Page>       
      </AppLayout>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrders: () => dispatch({type:'REQUEST_ORDERS'})
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.orders
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Orders);

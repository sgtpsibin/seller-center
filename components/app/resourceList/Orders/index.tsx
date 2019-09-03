import React from 'react';
import {Card, ResourceList,Pagination} from '@shopify/polaris';

import OrderItem from './orderItem';
import OrderFilter from './filter';

import { connect } from 'react-redux';
import { withRouter } from 'next/router';

class OrderResourceList extends React.PureComponent<any> {
  state = {
    selectedItems: []
  };
  
  handleSelectionChange = (selectedItems) => {
    this.setState({selectedItems});
  };
  
  renderItem = (item) => <OrderItem {...item}/>;  

  render() {
    const {orders,totalOrder} = this.props
    const {page} = this.props.router.query||1;
    
    const resourceName = {
      singular: 'order',
      plural: 'orders',
    };
    const items = orders||[];
    
    const bulkActions = [
      {
        content: 'Fulfill Orders',
        onAction: () => console.log('Todo: implement bulk add tags'),
      },
      {
        content: 'Capture payments',
        onAction: () => console.log('Todo: implement bulk remove tags'),
      }
    ];
    const filterControl = (      
      <OrderFilter/>
    );

    ///////PAGINATION
    const pages = Math.ceil(totalOrder/50)||1;
    const paginate = (
      <div className="d-block text-center mx-auto my-5">
        <Pagination
          hasPrevious={page-1>0}
          onPrevious={() => {
            console.log('Previous');
          }}
          hasNext={page<pages}
          onNext={() => {
            console.log('Next');
          }}
        />
      </div>
    );
    const paginateControl = orders.length!==0 ? paginate : null;
    
    ///////////////

    return (
      <Card>
        <ResourceList
          resourceName={resourceName}
          items={items}
          renderItem={this.renderItem}
          selectedItems={this.state.selectedItems}
          onSelectionChange={this.handleSelectionChange}
          bulkActions={bulkActions}
          filterControl={filterControl}
          showHeader={false}
          loading={this.props.loading}
        />
        {paginateControl}
      </Card>
      
    );
  }
}
const mapStateToProps = (state) => {
  return {
    orders: state.orders.orders,
    loading:state.orders.loading,
    totalOrder: Number.parseInt(state.orders.totalOrder)
  }
}
export default connect(mapStateToProps)(withRouter(OrderResourceList));
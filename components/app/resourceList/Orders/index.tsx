import React from 'react';
import {Card, ResourceList,Pagination} from '@shopify/polaris';

import OrderItem from './orderItem';
import OrderFilter from './filter';

import { connect } from 'react-redux';

type Props = {
  orders?:any,
  loading:boolean
}

class OrderResourceList extends React.Component<Props> {
  state = {
    selectedItems: [],
  };
  
  handleSelectionChange = (selectedItems) => {
    this.setState({selectedItems});
  };
  
  renderItem = (item) => <OrderItem {...item}/>;

  render() {
    const resourceName = {
      singular: 'order',
      plural: 'orders',
    };
    const items = this.props.orders||[];
    
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
        <div className="d-block text-center mx-auto my-5"><Pagination
          hasPrevious
          onPrevious={() => {
            console.log('Previous');
          }}
          hasNext
          onNext={() => {
            console.log('Next');
          }}
        />
        </div>
      </Card>
      
    );
  }
}
const mapStateToProps = (state) => {
  return {
    orders: state.orders.orders,
    loading:state.orders.loading
  }
}
export default connect(mapStateToProps)(OrderResourceList);
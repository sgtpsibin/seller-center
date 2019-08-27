import React from 'react';
import {Avatar, Card, FilterType, ResourceList, Select, TextField, TextStyle} from '@shopify/polaris';
import { Filter } from '@shopify/polaris/types';

import OrderItem from './orderItem';
import OrderFilter from './filter';

export default class OrderResourceList extends React.Component {
  state = {
    selectedItems: [],
    sortValue: 'DATE_MODIFIED_DESC',
    searchValue: '',
    appliedFilters: [
      {
        key: 'accountStatusFilter',
        value: 'Account enabled',
      },
    ],
  };
  handleSearchChange = (searchValue) => {
    this.setState({searchValue});
  };
  handleFiltersChange = (appliedFilters) => {
    this.setState({appliedFilters});
  };
  handleSortChange = (sortValue) => {
    this.setState({sortValue});
  };
  handleSelectionChange = (selectedItems) => {
    this.setState({selectedItems});
  };
  
  renderItem = (item) => <OrderItem {...item}/>;

  render() {
    const resourceName = {
      singular: 'customer',
      plural: 'customers',
    };
    const items = [
      {
        id: 341,
        url: 'customers/341',
        name: 'Mae Jemison',
        location: 'Decatur, USA',
        latestOrderUrl: 'orders/1456',
      },
      {
        id: 256,
        url: 'customers/256',
        name: 'Ellen Ochoa',
        location: 'Los Angeles, USA',
        latestOrderUrl: 'orders/1457',
      },
    ];
    
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
    const filters:Filter[] = [
      {
        key: 'orderCountFilter',
        label: 'Number of orders',
        operatorText: 'is greater than',
        type: FilterType.TextField,
      },
      {
        key: 'accountStatusFilter',
        label: 'Account status',
        operatorText: 'is',
        type: FilterType.Select,
        options: ['Enabled', 'Invited', 'Not invited', 'Declined'],
      },
    ];
    const filterControl = (
      // <ResourceList.FilterControl
      //   filters={filters}
      //   appliedFilters={this.state.appliedFilters}
      //   onFiltersChange={this.handleFiltersChange}
      //   searchValue={this.state.searchValue}
      //   onSearchChange={this.handleSearchChange}
      //   additionalAction={{
      //     content: 'Save',
      //     onAction: () => console.log('New filter saved'),
      //   }}
      // />
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
          // promotedBulkActions={promotedBulkActions}
          bulkActions={bulkActions}
          sortValue={this.state.sortValue}
          sortOptions={[
            {label: 'Newest update', value: 'DATE_MODIFIED_DESC'},
            {label: 'Oldest update', value: 'DATE_MODIFIED_ASC'},
          ]}
          onSortChange={(selected) => {
            this.setState({sortValue: selected});
            console.log(`Sort option changed to ${selected}.`);
          }}
          filterControl={filterControl}
        />
      </Card>
    );
  }
}

import React from 'react';
import { ChoiceList, Filters,Button} from '@shopify/polaris';
import {
  StarOutlineMinor,
  SortMinor
} from '@shopify/polaris-icons';

export default class OrderFilters extends React.Component {
  state = {
    orderStatus: null,
    fulfillmentStatus: null,
    paymentStatus: null,
    queryValue: null
  };

  render() {
    const { orderStatus, fulfillmentStatus, paymentStatus, queryValue } = this.state;
    const filters = [{
      key: 'orderStatus',
      label: 'Status',
      filter: <ChoiceList title={'Orders status'} titleHidden choices={[{ label: 'Open', value: 'Open' }, { label: 'Archived', value: 'Archived'}, { label: 'Canceled', value: 'Canceled' }]} selected={orderStatus || []} onChange={this.handleChange('orderStatus')} />,
      shortcut: true
    }, {
      key: 'paymentStatus',
      label: 'Payment Status',
      filter: <ChoiceList title={'Payment Status'} titleHidden choices={[{ label: 'Authorized', value: 'authorized' }, { label: 'Paid', value: 'paid'}, { label: 'Partially refunded', value: 'partially refunded' },{ label: 'Partially paid', value: 'partially paid'},{ label: 'Pending', value: 'pending'},{ label: 'Refunded', value: 'refunded'}, { label:'Unpaid',value:'unpaid' },{ label:'Voided', value:'voided'}]} selected={paymentStatus || []} onChange={this.handleChange('paymentStatus')} allowMultiple/>,
      shortcut: true
    },{
      key:'fulfillmentStatus',
      label: 'Fulfillment Status',
      filter: <ChoiceList title={'Fulfillment Status'} titleHidden choices={[{ label:'Fulfilled', value:'Fulfilled'},{ label:'Unfulfilled', value:'Unfulfilled'},{ label:'Partially fulfilled',value:'Partially fulfilled'}]} selected={fulfillmentStatus||[]} onChange={this.handleChange('fulfillmentStatus')} allowMultiple/>,
      shortcut: true
    }];

    const appliedFilters = Object.keys(this.state).filter(key => !isEmpty(this.state[key]) && key !== 'queryValue').map(key => {
      return {
        key,
        label: disambiguateLabel(key, this.state[key]),
        onRemove: this.handleRemove
      };
    });

    return (
      <>
          <Filters 
            queryValue={queryValue} 
            filters={filters} 
            appliedFilters={appliedFilters} 
            queryPlaceholder='Lọc đơn hàng'
            onQueryChange={this.handleChange('queryValue')} 
            onQueryClear={this.handleQueryClear} 
            onClearAll={this.handleClearAll} 
            focused={true}>
              <div className="d-flex flex-row">
                <div className="mx-3">
                  <Button icon={StarOutlineMinor}>Save</Button>
                </div>
                <div className="mr-2">
                  <Button icon={SortMinor}>Sort</Button>
                </div>
              </div>
              
            </Filters>
            
            </>);
  }

  handleChange = key => value => {
    this.setState({ [key]: value });
  };

  handleRemove = key => {
    this.setState({ [key]: null });
  };

  handleQueryClear = () => {
    this.setState({ queryValue: null });
  };

  handleClearAll = () => {
    this.setState({
      orderStatus: null,
      paymentStatus: null,
      fulfillmentStatus: null,
      queryValue: null
    });
  };
}

function disambiguateLabel(key, value) {
  switch (key) {
    // case 'moneySpent':
    //   return `Money spent is between $${value[0]} and $${value[1]}`;
    case 'paymentStatus':
      return value.map((val)=>`Payment ${val}`).join(', ');
    case 'orderStatus':
      return `${value} orders`;
    case 'fulfillmentStatus':
      return value.map((val)=>`${val}`).join(', ');
    default:
      return value;
  }
}

function isEmpty(value) {
  if (Array.isArray(value)) {
    return value.length === 0;
  } else {
    return value === '' || value == null;
  }
}

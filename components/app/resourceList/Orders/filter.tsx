import React from 'react';
import { ChoiceList, Filters, RangeSlider, TextField} from '@shopify/polaris';

export default class OrderFilters extends React.Component {
  state = {
    orderStatus: null,
    moneySpent: null,
    taggedWith: null,
    queryValue: null
  };

  render() {
    const { orderStatus, moneySpent, taggedWith, queryValue } = this.state;

    const filters = [{
      key: 'orderStatus',
      label: 'Status',
      filter: <ChoiceList title={'Orders status'} titleHidden choices={[{ label: 'Open', value: 'Open' }, { label: 'Archived', value: 'Archived'}, { label: 'Canceled', value: 'Canceled' }]} selected={orderStatus || []} onChange={this.handleChange('orderStatus')} />,
      shortcut: true
    }, {
      key: 'taggedWith',
      label: 'Tagged with',
      filter: <TextField label="Tagged with" value={taggedWith} onChange={this.handleChange('taggedWith')} labelHidden />,
      shortcut: true
    }, {
      key: 'moneySpent',
      label: 'Money spent',
      filter: <RangeSlider label="Money spent is between" labelHidden value={moneySpent || [0, 500]} prefix="$" output min={0} max={2000} step={1} onChange={this.handleChange('moneySpent')} />
    }];

    const appliedFilters = Object.keys(this.state).filter(key => !isEmpty(this.state[key]) && key !== 'queryValue').map(key => {
      return {
        key,
        label: disambiguateLabel(key, this.state[key]),
        onRemove: this.handleRemove
      };
    });

    return <Filters 
            queryValue={queryValue} 
            filters={filters} 
            appliedFilters={appliedFilters} 
            onQueryChange={this.handleChange('queryValue')} 
            onQueryClear={this.handleQueryClear} 
            onClearAll={this.handleClearAll} 
            focused={true} />
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
      moneySpent: null,
      taggedWith: null,
      queryValue: null
    });
  };
}

function disambiguateLabel(key, value) {
  switch (key) {
    case 'moneySpent':
      return `Money spent is between $${value[0]} and $${value[1]}`;
    case 'taggedWith':
      return `Tagged with ${value}`;
    case 'orderStatus':
      return `${value} orders`;
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

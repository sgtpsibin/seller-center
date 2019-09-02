import React from 'react';
import { ChoiceList, Filters,Button} from '@shopify/polaris';
import {
  StarOutlineMinor,
  SortMinor
} from '@shopify/polaris-icons';
import { connect } from 'react-redux';

import { debounce } from 'lodash';
import { getCurrentQuery } from '../../../../utils/getCurrentQuery';
import Router  from 'next/router';

class OrderFilters extends React.PureComponent<any> {
  state = {
    status: null,
    fulfillment_status: null,
    financial_status: null,
    query: null
  };

  componentDidMount() {
     //POPSTATE CONFIG 
    window.onpopstate=()=>{
      const {pathname,search} = window.location;
      if(pathname==="/orders") {
        if(Router.pathname!==pathname) {
          this.props.reqOrderWithQuery(search.substring(1));
          Router.push(pathname+search,pathname+search);
          return
        }
        this.props.reqOrderWithQuery(search.substring(1));
        let getQuery = getCurrentQuery();
        let popstateQuery = Object.assign(this.state,getQuery);
        this.setState(popstateQuery);
      }
    };
    //POPSTATE CONFIG 
    if(!window.location.search) {
      return
    } else {
      const currentQuery = getCurrentQuery();
      const newQuery = Object.assign(this.state,currentQuery);
      this.setState(newQuery);
    }    
  }
  

  render() {
    const { status, fulfillment_status, financial_status, query } = this.state;
    const filters = [{
      key: 'status',
      label: 'Status',
      filter: <div className="Polaris-Filters__status"><ChoiceList title={'Orders status'} titleHidden choices={[{ label: 'Open', value: 'open' }, { label: 'Archived', value: 'closed'}, { label: 'Canceled', value: 'cancelled' }]} selected={status || []} onChange={this.handleChange('status')} /></div>,
      shortcut: true
    }, {
      key: 'financial_status',
      label: 'Payment Status',
      filter: <ChoiceList title={'Payment Status'} titleHidden choices={[{ label: 'Authorized', value: 'authorized' }, { label: 'Paid', value: 'paid'}, { label: 'Partially refunded', value: 'partially_refunded' },{ label: 'Partially paid', value: 'partially_paid'},{ label: 'Pending', value: 'pending'},{ label: 'Refunded', value: 'refunded'}, { label:'Unpaid',value:'unpaid' },{ label:'Voided', value:'voided'}]} selected={financial_status || []} onChange={this.handleChange('financial_status')} allowMultiple/>,
      shortcut: true
    },{
      key:'fulfillment_status',
      label: 'Fulfillment Status',
      filter: <ChoiceList title={'Fulfillment Status'} titleHidden choices={[{ label:'Fulfilled', value:'shipped'},{ label:'Unfulfilled', value:'unshipped'},{ label:'Partially fulfilled',value:'partial'}]} selected={fulfillment_status||[]} onChange={this.handleChange('fulfillment_status')} allowMultiple/>,
      shortcut: true
    }];

    const appliedFilters = Object.keys(this.state).filter(key => !isEmpty(this.state[key]) && key !== 'query').map(key => {
      return {
        key,
        label: disambiguateLabel(key, this.state[key]),
        onRemove: this.handleRemove
      };
    });

    return (
      <>
          <Filters 
            queryValue={query} 
            filters={filters} 
            appliedFilters={appliedFilters} 
            queryPlaceholder='Lọc đơn hàng'
            onQueryChange={this.handleChange('query')} 
            onQueryClear={this.handleQueryClear} 
            onClearAll={this.handleClearAll} 
            focused={true}>
              <div className="d-flex flex-row">
                <div className="mx-3">
                  <Button icon={StarOutlineMinor}></Button>
                </div>
                <div className="mr-2">
                  <Button icon={SortMinor}></Button>
                </div>
              </div>              
            </Filters>            
    </>);
  }

  

  filterToQuery = () => {
    let queryObject = {};
    Object.keys(this.state)
      .filter(key => !isEmpty(this.state[key]))
      .map(key=>{
        if(typeof(this.state[key])==='string') {
          queryObject[key] = this.state[key];
        }else {        
          queryObject[key]=this.state[key].map(option=>`${option}`).join(',');
        }
      });
    const queryString = Object.keys(queryObject).map(key => key + '=' + queryObject[key]).join('&');
    return queryString;
  }

  handleChange = key => value => {
    this.setState({[key]: value },()=>this.reloadResourceList());
  };

  reloadResourceList = debounce(() => {    
      const query= this.filterToQuery();
      window.history.pushState(null,null,`/orders?${query}`);
      this.props.reqOrderWithQuery(query);
  },1000);

  handleRemove = key => {
    this.setState({ [key]: null },()=>this.reloadResourceList());
  };

  handleQueryClear = () => {
    this.setState({ query: null },()=>this.reloadResourceList());
  };

  handleClearAll = () => {
    this.setState({
      status: null,
      financial_status: null,
      fulfillment_status: null,
      query: null
    },()=>this.reloadResourceList());
  };
}

function disambiguateLabel(key, value) {
  switch (key) {
    // case 'moneySpent':
    //   return `Money spent is between $${value[0]} and $${value[1]}`;
    case 'financial_status':
      return value.map((val)=>`Payment ${val}`).join(', ');
    case 'status':
      return `${value} orders`;
    case 'fulfillment_status':
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

const mapDispatchToProps = (dispatch) => {
  return {
    reqOrderWithQuery: query => dispatch({type:'REQUEST_ORDERS_WITH_QUERY',query})
  }
}

export default connect(null,mapDispatchToProps)(OrderFilters);
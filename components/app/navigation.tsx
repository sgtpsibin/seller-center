import React from 'react';
import {Navigation} from '@shopify/polaris';

import {HomeMajorMonotone, 
        OrdersMajorTwotone, 
        ConversationMinor,
        ProductsMajorMonotone,
        CustomersMajorMonotone,
        AnalyticsMajorMonotone} from '@shopify/polaris-icons';

import {withRouter, NextRouter } from 'next/router';
import {connect} from 'react-redux';
import Router from 'next/router';

type Props = {
  router: NextRouter,
  Loading:()=>any,
  Loaded: () => any
}
class NavigationBar extends React.Component<Props> {    

    toggleState = (key) => {
        return () => {
          this.setState((prevState) => ({[key]: !prevState[key]}));
        };
    };  

    routerConfig = () => {
      Router.events.on('routeChangeStart',()=>{
        this.props.Loading();
      });
      Router.events.on('routeChangeComplete',()=>{
        this.props.Loaded();
      });
      return;      
    }
    
    isSelected = (url:string):boolean => {
      if (this.props.router.pathname===url) {
        return true;
      }
      return false;
    }
  render() {
    this.routerConfig();
    return (
      <Navigation location="">
          <Navigation.Section        
            items={[
              {
                url: '/',
                selected:this.isSelected('/'),
                label: 'Trang Chủ',
                icon: HomeMajorMonotone,
              },
              {
                url:'/orders',               
                selected:this.isSelected('/orders'),
                label: 'Đơn Hàng',
                icon: OrdersMajorTwotone,
                badge: '20',
                subNavigationItems: [
                  {
                    url: '/orders',
                    label: 'Tất cả đơn hàng',
                    matches: this.isSelected('/orders')
                                     
                  },
                  {
                    url:'/draft_orders',
                    label: 'Drafts',
                    matches:this.isSelected('/draft_orders')
                  }
                ]               
              },
              {
                url: '/products',
                selected: this.isSelected('/products'),
                label: 'Sản phẩm',
                icon: ProductsMajorMonotone,
              },
              {
                url: '/customers',
                label: 'Khách hàng',
                icon: CustomersMajorMonotone,
                selected: this.isSelected('/customers'),
              },
              {
                url: '/dashboard',
                label: 'Thống kê',
                icon: AnalyticsMajorMonotone,
                selected: this.isSelected('/dashboard'),
              }
            ]}
            action={{
              icon: ConversationMinor,
              accessibilityLabel: 'Contact support',
              onClick: this.toggleState('modalActive'),
            }}
          />
        </Navigation>      
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    Loading: ()=> dispatch({type:'LOADING'}),
    Loaded: ()=> dispatch({type:'LOADED'})
  }
}
export default connect(null,mapDispatchToProps)(withRouter(NavigationBar));

import React from 'react';
import {Navigation} from '@shopify/polaris';

import {HomeMajorMonotone, 
        OrdersMajorTwotone, 
        ConversationMinor,
        ProductsMajorMonotone,
        CustomersMajorMonotone,
        AnalyticsMajorMonotone} from '@shopify/polaris-icons';

import {withRouter, NextRouter } from 'next/router';
// import Router from 'next/router';

type Props = {
  router: NextRouter 
}
class NavigationBar extends React.PureComponent<Props> {    

    toggleState = (key) => {
        return () => {
          this.setState((prevState) => ({[key]: !prevState[key]}));
        };
    };  

    isSelected = (url:string,altUrl?:string):boolean => {
      const { asPath } = this.props.router;

      // if(altUrl) {
      //   if(asPath===altUrl)
      // }
      if (asPath.split('/')[1].split('?')[0]===url) {
        return true;
      }
      return false;
    }
  render() {
    // this.routerConfig();
    return (
      <Navigation location="">
          <Navigation.Section        
            items={[
              {
                url: '/',
                selected:this.isSelected(''),
                label: 'Trang Chủ',
                icon: HomeMajorMonotone,
              },
              {
                url:'/orders',               
                selected:this.isSelected('orders'),
                label: 'Đơn Hàng',
                icon: OrdersMajorTwotone,
                badge: '20',
                subNavigationItems: [
                  {
                    url: '/orders',
                    label: 'Tất cả đơn hàng',
                    matches: this.isSelected('orders')
                                     
                  },
                  {
                    url:'/draft_orders',
                    label: 'Drafts',
                    matches:this.isSelected('draft_orders')
                  }
                ]               
              },
              {
                url: '/products',
                selected: this.isSelected('products'),
                label: 'Sản phẩm',
                icon: ProductsMajorMonotone,
              },
              {
                url: '/customers',
                label: 'Khách hàng',
                icon: CustomersMajorMonotone,
                selected: this.isSelected('customers'),
              },
              {
                url: '/dashboard',
                label: 'Thống kê',
                icon: AnalyticsMajorMonotone,
                selected: this.isSelected('dashboard'),
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


export default withRouter(NavigationBar);

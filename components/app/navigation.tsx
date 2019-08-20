import React from 'react';
import {Navigation} from '@shopify/polaris';
import {HomeMajorMonotone, 
        OrdersMajorTwotone, 
        ConversationMinor,
        ProductsMajorMonotone,
        CustomersMajorMonotone,
        AnalyticsMajorMonotone} from '@shopify/polaris-icons';

class NavigationBar extends React.Component {

    state={
        isLoading: false
    }

    toggleState = (key) => {
        return () => {
          this.setState((prevState) => ({[key]: !prevState[key]}));
        };
    };  
    
  render() {
    return (
      <Navigation location="/">
          <Navigation.Section        
            items={[
              {
                label: 'Trang Chủ',
                icon: HomeMajorMonotone,
                onClick: this.toggleState('isLoading'),
              },
              {
                label: 'Đơn Hàng',
                icon: OrdersMajorTwotone,
                onClick: this.toggleState('isLoading'),
              },
              {
                label: 'Sản phẩm',
                icon: ProductsMajorMonotone,
                onClick: this.toggleState('isLoading'),
              },
              {
                label: 'Khách hàng',
                icon: CustomersMajorMonotone,
                onClick: this.toggleState('isLoading'),
              },
              {
                label: 'Thống kê',
                icon: AnalyticsMajorMonotone,
                onClick: this.toggleState('isLoading'),
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

export default NavigationBar;

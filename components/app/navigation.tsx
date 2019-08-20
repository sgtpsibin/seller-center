import React from 'react';
import {Navigation,Frame} from '@shopify/polaris';
import {HomeMajorMonotone, OrdersMajorTwotone, ConversationMinor,ArrowLeftMinor} from '@shopify/polaris-icons';

class NavigationBar extends React.Component {

    state={
        isLoading: false
    }

    toggleState = (key) => {
        return () => {
          this.setState((prevState) => ({[key]: !prevState[key]}));
        };
    };  
    
    navigationMarkup = (
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
            ]}
            action={{
              icon: ConversationMinor,
              accessibilityLabel: 'Contact support',
              onClick: this.toggleState('modalActive'),
            }}
          />
        </Navigation>
      );
  render() {
    return (
      <Frame navigation={this.navigationMarkup} ></Frame>
    );
  }
}

export default NavigationBar;

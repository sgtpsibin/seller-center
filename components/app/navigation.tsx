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


class NavigationBar extends React.Component<{router:NextRouter,Loading,Loaded:()=>any}> { 
    

    state={
        isLoading: false
    }

    toggleState = (key) => {
        return () => {
          this.setState((prevState) => ({[key]: !prevState[key]}));
        };
    };  

    routerConfig = () => {
      Router.events.on('routeChangeStart',(url)=>{
        this.props.Loading();
      });
      Router.events.on('routeChangeComplete',(url)=>{
        this.props.Loaded();
      });
      return;      
    }

    goTo = (url:string) => {
    
      const {router} = this.props      
      event.preventDefault();
      router.push(url);
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
      <Navigation location="/">
          <Navigation.Section        
            items={[
              {
                url: '/',
                selected:this.isSelected('/'),
                label: 'Trang Chủ',
                icon: HomeMajorMonotone,
                onClick: () => this.goTo('/'),
              
              },
              {
                url:'orders',               
                selected:this.isSelected('/orders'),
                label: 'Đơn Hàng',
                icon: OrdersMajorTwotone,
                onClick: ()=> this.goTo('/orders'),
                badge: '20',
                subNavigationItems: [
                  {
                    url: 'orders',
                    label: 'Tất cả đơn hàng',
                    onClick: ()=> this.goTo('/orders'), 
                    matches: this.isSelected('/orders')
                                     
                  },
                  {
                    url:'/draft_orders',
                    label: 'Drafts',
                    onClick: ()=> this.goTo('/draft_orders'),
                  }

              ]
               
              },
              {
                url: 'products',
                selected: this.isSelected('/products'),
                label: 'Sản phẩm',
                icon: ProductsMajorMonotone,
                onClick: () => this.goTo('/products')
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

const mapDispatchToProps = (dispatch) => {
  return {
    Loading: ()=> dispatch({type:'LOADING'}),
    Loaded: ()=> dispatch({type:'LOADED'})
  }
}
export default connect(null,mapDispatchToProps)(withRouter(NavigationBar));

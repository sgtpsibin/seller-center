import React from 'react';
import {Card, Frame, Layout, Loading, SkeletonBodyText, SkeletonDisplayText, SkeletonPage, TextContainer} from '@shopify/polaris';
import {connect} from 'react-redux';
import Head from 'next/head';

import NavigationBar from '../app/navigation';
import TopBarMenu from '../app/topbar';

import '../../static/style/main.scss';
import  Router from 'next/router';

type LayoutProps = {
  showMobileNavigation:boolean,
  dispatch:any,
  isLoading:boolean,
  title?:string,
  getUserData:any,
  toogleNav:any,
  user:any
}
class AppLayout extends React.Component<LayoutProps> {
 
  componentDidMount() {
    if (!localStorage.authToken) {
      Router.push('/login');
    } else {
      if(Object.entries(this.props.user).length === 0 && this.props.user.constructor === Object){
        this.props.getUserData();
      }
    }

  }
  render() {
   
    const topBarMarkup = (
      <TopBarMenu/>
    );

    const navigationMarkup = (
      <NavigationBar/>
    );

    const loadingMarkup = this.props.isLoading ? <Loading /> : null;

    const actualPageMarkup = (
      this.props.children
    );

    const loadingPageMarkup = (
      <SkeletonPage>
        <Layout>
          <Layout.Section>
            <Card sectioned>
              <TextContainer>
                <SkeletonDisplayText size="small" />
                <SkeletonBodyText lines={9} />
              </TextContainer>
            </Card>
          </Layout.Section>
        </Layout>
      </SkeletonPage>
    );

    const pageMarkup = this.props.isLoading ? loadingPageMarkup : actualPageMarkup; 
    
    return (
      <div style={{height: '500px'}}>  
          <Head>
            <title>{this.props.title ? this.props.title + " - TTS" : "SELLER CENTER - TTS"}</title>
          </Head>      
          <Frame
            topBar={topBarMarkup}
            navigation={navigationMarkup}
            showMobileNavigation={this.props.showMobileNavigation}
            onNavigationDismiss={this.props.toogleNav}
          >          
            {loadingMarkup}
            {pageMarkup}
          </Frame>      
      </div>
    );
  }

  toggleState = (key) => {
    return () => {
      this.setState((prevState) => ({[key]: !prevState[key]}));
    };
  };///delete

  handleSearchFieldChange = (value) => {
    this.setState({searchText: value});
    if (value.length > 0) {
      this.setState({searchActive: true});
    } else {
      this.setState({searchActive: false});
    }
  };

  handleSearchResultsDismiss = () => {
    this.setState(() => {
      return {
        searchActive: false,
        searchText: '',
      };
    });
  }; 
}

const mapStateToProps = (state) => {
  return {
    showMobileNavigation: state.layout.showMobileNavigation,
    isLoading: state.layout.isLoading,
    user: state.user.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserData: () => dispatch({type:'REQUEST_USER_DATA'}),
    toogleNav: () => dispatch({type:'TOOGLE_NAVIGATION'})
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(AppLayout);

import React from 'react';
import {Card, Frame, Layout, Loading, SkeletonBodyText, SkeletonDisplayText, SkeletonPage, TextContainer} from '@shopify/polaris';
import NavigationBar from '../app/navigation';
import {connect} from 'react-redux';

import TopBarMenu from '../app/topbar';
import '../../static/style/main.scss';


type LayoutProps = {
  showMobileNavigation:boolean,
  dispatch:any,
  isLoading:boolean
}
class AppLayout extends React.Component<LayoutProps> {
 
  render() {
   
    const topBarMarkup = (
      // <TopBar
      //   showNavigationToggle={true}
      //   userMenu={userMenuMarkup}
      //   searchResultsVisible={searchActive}
      //   searchField={searchFieldMarkup}
      //   searchResults={searchResultsMarkup}
      //   onSearchResultsDismiss={this.handleSearchResultsDismiss}
      //   onNavigationToggle={this.toggleState('showMobileNavigation')}
      // />
      <TopBarMenu/>
    );

    const navigationMarkup = (
      // Navigation
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
        
          <Frame
            topBar={topBarMarkup}
            navigation={navigationMarkup}
            showMobileNavigation={this.props.showMobileNavigation}
            onNavigationDismiss={()=>{this.props.dispatch({type:'TOOGLE_NAVIGATION'})}}
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
    isLoading: state.layout.isLoading
  }

}
export default connect(mapStateToProps)(AppLayout);

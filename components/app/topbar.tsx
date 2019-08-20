import React from 'react';
import {ActionList, Card, Frame, TopBar} from '@shopify/polaris';
import {ArrowLeftMinor} from '@shopify/polaris-icons';

interface TopBarState {
    userMenuOpen: boolean,
    searchActive: boolean,
    searchText: string
}

class TopBarMenu extends React.Component<{},TopBarState> {
  state = {
    userMenuOpen: false,
    searchActive: false,
    searchText: '',
  };

  render() {
    const {
      state,
      handleSearchChange,
      handleSearchResultsDismiss,
      toggleUserMenu,
    } = this;
    const {userMenuOpen, searchText, searchActive} = state;


    const userMenuMarkup = (
      <TopBar.UserMenu
        actions={[
          {
            items: [{content: 'Back to Shopify', icon: ArrowLeftMinor}],
          },
          {
            items: [{content: 'Community forums'}],
          },
        ]}
        name="Dharma"
        detail="Jaded Pixel"
        initials="D"
        open={userMenuOpen}
        onToggle={toggleUserMenu}
      />
    );

    const searchResultsMarkup = (
      <Card>
        <ActionList
          items={[
            {content: 'Shopify help center'},
            {content: 'Community forums'},
          ]}
        />
      </Card>
    );

    const searchFieldMarkup = (
      <TopBar.SearchField
        onChange={handleSearchChange}
        value={searchText}
        placeholder="Search"
      />
    );

    const topBarMarkup = (
      <TopBar
        showNavigationToggle={true}
        userMenu={userMenuMarkup}
        searchResultsVisible={searchActive}
        searchField={searchFieldMarkup}
        searchResults={searchResultsMarkup}
        onSearchResultsDismiss={handleSearchResultsDismiss}
        onNavigationToggle={() => {
          console.log('toggle navigation visibility');
        }}
      />
    );

    return (
      <div style={{height: '50px'}}>
        
          <Frame topBar={topBarMarkup} />
    
      </div>
    );
  }

  toggleUserMenu = () => {
    this.setState(({userMenuOpen}) => ({userMenuOpen: !userMenuOpen}));
  };

  handleSearchResultsDismiss = () => {
    this.setState(() => {
      return {
        searchActive: false,
        searchText: '',
      };
    });
  };

  handleSearchChange = (value) => {
    this.setState({searchText: value});
    if (value.length > 0) {
      this.setState({searchActive: true});
    } else {
      this.setState({searchActive: false});
    }
  };
}

export default TopBarMenu;
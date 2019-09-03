import React from "react";
import { ActionList, Card, TopBar } from "@shopify/polaris";
import { ArrowLeftMinor, OutgoingMajorMonotone } from "@shopify/polaris-icons";
import { connect } from "react-redux";
import Router from "next/router";

type TopBarState = {
  userMenuOpen: boolean;
  searchActive: boolean;
  searchText: string;
};
type TopBarProps = {
  tooglenav: any;
  shop: any;
};

class TopBarMenu extends React.Component<TopBarProps, TopBarState> {
  state = {
    userMenuOpen: false,
    searchActive: false,
    searchText: ""
  };

  render() {
    const {
      state,
      handleSearchChange,
      handleSearchResultsDismiss,
      toggleUserMenu
    } = this;
    const { userMenuOpen, searchText, searchActive } = state;

    const { shop } = this.props;

    const logout = () => {
      localStorage.clear();
      Router.push("/login");
    };

    const userMenuMarkup = (
      <TopBar.UserMenu
        actions={[
          {
            items: [
              {
                content: "Về trang chủ",
                icon: ArrowLeftMinor,
                url: "https://thitruongsi.com"
              }
            ]
          },
          {
            items: [
              {
                content: "Đăng xuất",
                icon: OutgoingMajorMonotone,
                onAction: logout
              }
            ]
          }
        ]}
        name={shop.name}
        avatar="https://nongdan.pro/wp-content/uploads/2017/05/shop-icon.png"
        // detail="TTS SELLER"
        initials="DE"
        open={userMenuOpen}
        onToggle={toggleUserMenu}
      />
    );

    const searchResultsMarkup = (
      <Card>
        <ActionList
          items={[
            { content: "Shopify help center" },
            { content: "Community forums" }
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

    return (
      <TopBar
        showNavigationToggle={true}
        userMenu={userMenuMarkup}
        searchResultsVisible={searchActive}
        searchField={searchFieldMarkup}
        searchResults={searchResultsMarkup}
        onSearchResultsDismiss={handleSearchResultsDismiss}
        onNavigationToggle={this.props.tooglenav}
      />
    );
  }

  toggleUserMenu = () => {
    this.setState(({ userMenuOpen }) => ({ userMenuOpen: !userMenuOpen }));
  };

  handleSearchResultsDismiss = () => {
    this.setState(() => {
      return {
        searchActive: false,
        searchText: ""
      };
    });
  };

  handleSearchChange = value => {
    this.setState({ searchText: value });
    if (value.length > 0) {
      this.setState({ searchActive: true });
    } else {
      this.setState({ searchActive: false });
    }
  };
}

const mapStateToProps = state => {
  return {
    shop: state.user.shop
  };
};

const mapDispatchToProps = dispatch => {
  return {
    tooglenav: () => dispatch({ type: "TOOGLE_NAVIGATION" })
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopBarMenu);

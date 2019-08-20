import React from 'react';
import {ActionList, AppProvider, Card, ContextualSaveBar, FormLayout, Frame, Layout, Loading, Modal, Navigation, Page, SkeletonBodyText, SkeletonDisplayText, SkeletonPage, TextContainer, TextField, Toast, TopBar} from '@shopify/polaris';
import NavigationBar from '../app/navigation';

class AppLayout extends React.Component {
  defaultState = {
    emailFieldValue: 'dharma@jadedpixel.com',
    nameFieldValue: 'Jaded Pixel',
  };

  state = {
    showToast: false,
    isLoading: false,
    isDirty: false,
    searchActive: false,
    searchText: '',
    userMenuOpen: false,
    showMobileNavigation: false,
    modalActive: false,
    nameFieldValue: this.defaultState.nameFieldValue,
    emailFieldValue: this.defaultState.emailFieldValue,
    storeName: this.defaultState.nameFieldValue,
    supportSubject: '',
    supportMessage: '',
  };

  render() {
    const {
      showToast,
      isLoading,
      isDirty,
      searchActive,
      searchText,
      userMenuOpen,
      showMobileNavigation,
      nameFieldValue,
      emailFieldValue,
      modalActive,
      storeName,
    } = this.state;

    const toastMarkup = showToast ? (
      <Toast
        onDismiss={this.toggleState('showToast')}
        content="Changes saved"
      />
    ) : null;

    const userMenuActions = [
      {
        id:'1',
        items: [{content: 'Community forums'}]
      }
    ];

    const navigationUserMenuMarkup = (
      <Navigation.UserMenu
        actions={userMenuActions}
        name="Dharma"
        detail={storeName}
        avatarInitials="D"
      />
    );

    const contextualSaveBarMarkup = isDirty ? (
      <ContextualSaveBar
        message="Unsaved changes"
        saveAction={{
          onAction: this.handleSave,
        }}
        discardAction={{
          onAction: this.handleDiscard,
        }}
      />
    ) : null;

    const userMenuMarkup = (
      <TopBar.UserMenu
        actions={userMenuActions}
        name="Dharma"
        detail={storeName}
        initials="D"
        open={userMenuOpen}
        onToggle={this.toggleState('userMenuOpen')}
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
        onChange={this.handleSearchFieldChange}
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
        onSearchResultsDismiss={this.handleSearchResultsDismiss}
        onNavigationToggle={this.toggleState('showMobileNavigation')}
      />
    );

    const navigationMarkup = (
      // Navigation
      <NavigationBar/>
    );

    const loadingMarkup = isLoading ? <Loading /> : null;

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

    const pageMarkup = isLoading ? loadingPageMarkup : actualPageMarkup;

    const modalMarkup = (
      <Modal
        open={modalActive}
        onClose={this.toggleState('modalActive')}
        title="Contact support"
        primaryAction={{
          content: 'Send',
          onAction: this.toggleState('modalActive'),
        }}
      >
        <Modal.Section>
          <FormLayout>
            <TextField
              label="Subject"
              value={this.state.supportSubject}
              onChange={this.handleSubjectChange}
            />
            <TextField
              label="Message"
              value={this.state.supportMessage}
              onChange={this.handleMessageChange}
              multiline
            />
          </FormLayout>
        </Modal.Section>
      </Modal>
    );

  

    return (
      <div style={{height: '500px'}}>
        
          <Frame
            topBar={topBarMarkup}
            navigation={navigationMarkup}
            showMobileNavigation={showMobileNavigation}
            onNavigationDismiss={this.toggleState('showMobileNavigation')}
          >
            {contextualSaveBarMarkup}
            {loadingMarkup}
            {pageMarkup}
            {toastMarkup}
            {modalMarkup}
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

  handleEmailFieldChange = (emailFieldValue) => {
    this.setState({emailFieldValue});
    if (emailFieldValue != '') {
      this.setState({isDirty: true});
    }
  };

  handleNameFieldChange = (nameFieldValue) => {
    this.setState({nameFieldValue});
    if (nameFieldValue != '') {
      this.setState({isDirty: true});
    }
  };

  handleSave = () => {
    this.defaultState.nameFieldValue = this.state.nameFieldValue;
    this.defaultState.emailFieldValue = this.state.emailFieldValue;

    this.setState({
      isDirty: false,
      showToast: true,
      storeName: this.defaultState.nameFieldValue,
    });
  };

  handleDiscard = () => {
    this.setState({
      emailFieldValue: this.defaultState.emailFieldValue,
      nameFieldValue: this.defaultState.nameFieldValue,
      isDirty: false,
    });
  };

  handleSubjectChange = (supportSubject) => {
    this.setState({supportSubject});
  };

  handleMessageChange = (supportMessage) => {
    this.setState({supportMessage});
  };
}

export default AppLayout;

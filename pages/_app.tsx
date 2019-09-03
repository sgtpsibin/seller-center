import App from "next/app";
import { Link } from "../server/routes";
import React from "react";
import { Provider } from "react-redux";
import { AppProvider } from "@shopify/polaris";
import withRedux from "next-redux-wrapper";
import withReduxSaga from "next-redux-saga";

import createStore from "../redux/store";

const theme = {
  colors: {
    topBar: {
      background: "#357997"
    }
  },
  logo: {
    width: 50,
    topBarSource: "../static/images/logo.png",
    url: "https://thitruongsi.com",
    accessibilityLabel: "Thị Trường Sỉ"
  }
};

const CustomLinkComponent = ({ children, url, ...rest }) => {
  return (
    <Link route={url}>
      <a {...rest}>{children}</a>
    </Link>
  );
};

class MyApp extends App<any> {
  static async getInitialProps({ Component, ctx, router: { query } }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ctx });
    }
    return { pageProps, query };
  }

  render() {
    const { Component, pageProps, store, query } = this.props;
    return (
      <Provider store={store}>
        <AppProvider theme={theme} linkComponent={CustomLinkComponent}>
          <Component {...pageProps} query={query} />
        </AppProvider>
      </Provider>
    );
  }
}

export default withRedux(createStore)(withReduxSaga(MyApp));

import App from 'next/app'
import Link from 'next/link';
import React from 'react'
import { Provider } from 'react-redux'
import { AppProvider} from '@shopify/polaris';
import withRedux from 'next-redux-wrapper'
import withReduxSaga from 'next-redux-saga'

import createStore from '../redux/store'

const theme = {
  colors: {
    topBar: {
      background: '#357997',
    },
  },
  logo: {
    width: 50,
    topBarSource:
      '../static/images/logo.png',
    url: 'https://thitruongsi.com',
    accessibilityLabel: 'Thị Trường Sỉ',
  },
};

const CustomLinkComponent = ({children, url, ...rest}) => {
  return (
    <Link
      href={url}
    >
      <a
      {...rest}
      >
        {children}
      </a>
    </Link>
  );
};

class MyApp extends App {
  static async getInitialProps ({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ctx })
    }

    return { pageProps }
  }

  render () {
    const { Component, pageProps, store } = this.props
    return (
      <Provider store={store}>
        <AppProvider theme={theme} linkComponent={CustomLinkComponent}>
          <Component {...pageProps} />
        </AppProvider>
      </Provider>
    )
  }
}

export default withRedux(createStore)(withReduxSaga(MyApp))

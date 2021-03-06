import React from 'react';
import Router from 'next/router'
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../common/theme';
import { nowdataGet } from '../common/backend/auth'

export default function MyApp(props) {
  const { Component, pageProps, router } = props;

  const chackLogin = async () => {
    const response = await nowdataGet()
    const status = response.status.toString();

    if (
      (status === '200') && (
        router.asPath == '/' ||
        router.asPath == '/login' ||
        router.asPath == '/signup')
    ) {
      Router.push('/home')
    } else if (
      (status === '401') && (
        router.asPath != '/' &&
        router.asPath != '/login' &&
        router.asPath != '/signup')
    ) {
      Router.push('/login')
    }
  }

  React.useEffect(() => {
    // ログインチェック
    chackLogin()

    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
import React from 'react';
import Head from 'next/head';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Provider } from 'next-auth/client';
import NProgress from 'nprogress';
import { Router } from 'next/dist/client/router';
import 'nprogress/nprogress.css';
import MyThemeProvider from 'src/components/MyThemeProvider';
import { SettingsProvider } from 'src/contexts/SettingsContext';

NProgress.configure({
  showSpinner: false,
  trickleRate: 0.1,
  trickleSpeed: 300,
});

Router.events.on('routeChangeStart', () => {
  NProgress.start();
});

Router.events.on('routeChangeComplete', () => {
  NProgress.done();
});

Router.events.on('routeChangeError', () => {
  NProgress.done();
});

export default function MyApp(props) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>My page</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <Provider session={pageProps.session}>
        <SettingsProvider>
          <MyThemeProvider>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Component {...pageProps} />
          </MyThemeProvider>
        </SettingsProvider>
      </Provider>
      <style global jsx>
        {`
          #nprogress {
            position: relative;
            z-index: 9999999;
          }
          #nprogress .bar {
            background: #f44336 !important;
            height: 3px;
          }
        `}
      </style>
    </>
  );
}

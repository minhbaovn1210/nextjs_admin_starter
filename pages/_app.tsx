import "isomorphic-fetch";
import "assets/styles.less";

import App from "next/app";
import Head from "next/head";
import Router from "next/router";
import dynamic from "next/dynamic";

import { GlobalStyles } from "components/styles/GlobalStyles";
import NProgress from "nprogress";
import { appWithTranslation } from "i18n";
import AuthProvider from "providers/AuthProvider";
import Layout from "components/Layout";
import AppProvider from "providers/AppProvider";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <meta
            name="viewport"
            content="user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1,width=device-width,height=device-height"
          />
          <meta charSet="utf-8" />

          <title>Admin Portal</title>
          <link rel="icon" href="/images/logo-dark.png" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Quicksand:wght@500;600;700&display=swap"
            rel="stylesheet"
          />
        </Head>

        <GlobalStyles />

        <AuthProvider>
          <AppProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </AppProvider>
        </AuthProvider>
      </>
    );
  }
}

MyApp.getInitialProps = async (appCtx: any) => {
  const { Component, ctx } = appCtx;
  const pageProps =
    (Component.getInitialProps && (await Component.getInitialProps(ctx))) || {};

  pageProps.query = ctx.query;

  return { pageProps };
};

const app = appWithTranslation(MyApp);

// Client side rendering only
export default dynamic(() => Promise.resolve(app), {
  ssr: false,
});

import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import type { AppProps } from "next/app";
import { Provider, useDispatch } from "react-redux";

import Theme from "../components/Theme";
import { useStore, signIn, signOut } from "../app/reducers";
import { auth } from "../../firebase";

function MyApp({ Component, pageProps }: AppProps) {
  // Remove the server-side injected CSS.
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  // activate Redux
  const store = useStore(pageProps.initialReduxState);

  // subscribe user
  // 以下の処理は、contextを使って各ページで必要なところを跨いで実行できるようにしたい。
  const AuthComponent = () => {
    const dispatch = useDispatch();
    useEffect(() => {
      const unSub = auth.onAuthStateChanged((authUser) => {
        if (authUser) {
          if (authUser.displayName) {
            dispatch(signIn(authUser.uid, authUser.displayName));
          } else {
            dispatch(signIn(authUser.uid));
          }
        } else {
          dispatch(signOut());
        }
      });
      return () => {
        unSub();
      };
    }, [dispatch]);
    return null;
  };

  // ここまで

  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <Provider store={store}>
        <AuthComponent />
        <ThemeProvider theme={Theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;

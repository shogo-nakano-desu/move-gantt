import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { useRouter } from "next/router";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

import Theme from "../components/Theme";
import { useStore } from "../utils/reducers";
import { auth } from "../../firebaseClient";
import "./styles.css";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  // Remove the server-side injected CSS.
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      !user && router.push("/sign-in"); //dispatch(setCurrentUser(user.uid));もしようとしたらダメだった
    });
  }, []); // 元々は[]だったのだが、dependencies arrayを作ってとエラーなので入れた。

  // activate Redux
  const store = useStore(pageProps.initialReduxState);

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
        {/* <AuthComponent /> */}
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

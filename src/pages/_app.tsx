import React, { useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Theme from "../components/Theme";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { login, logout } from "../features/user/userSlice";
import { auth } from "../../firebase";
import { useAppDispatch } from "../app/store";
import type { AppProps } from "next/app";
import AuthContext from "../app/AuthContext";

interface MyAppWrapperProps {
  router: any;
  Component: PropTypes.Validator<PropTypes.ReactComponentLike>;
  pageProps: PropTypes.Validator<object>;
}

const MyAppWrapper = (props: any) => {
  return (
    <Provider store={store}>
      <MyApp
        router={props.router}
        Component={props.Component}
        pageProps={props.pageProps}
      />
    </Provider>
  );
};

function MyApp({ Component, pageProps }: AppProps) {
  // Remove the server-side injected CSS.
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  // Reduxを投入

  const dispatch = useAppDispatch();
  useEffect(() => {
    const unSub = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            displayName: authUser.displayName!,
          })
        );
      } else {
        dispatch(logout());
      }
    });
    return () => {
      unSub();
    };
  }, [dispatch]);

  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <ThemeProvider theme={Theme}>
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

export default MyAppWrapper;

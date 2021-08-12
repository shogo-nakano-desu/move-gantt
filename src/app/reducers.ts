import { useMemo } from "react";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";

// actions
export const emailForm = (email: string) => ({
  type: "CHANGE_EMAIL_FORM",
  payload: email,
});

export const passwordForm = (password: string) => ({
  type: "CHANGE_PASSWORD_FORM",
  payload: password,
});

export const userNameForm = (userName: string) => ({
  type: "CHANGE_USERNAME",
  payload: userName,
});

export const changeAccountFlag = (flag: boolean) => ({
  type: "CHANGE_ACCOUNT_FRAG",
  payload: flag,
});

export const initialState = {
  authForm: {
    formEmail: "",
    formPassword: "",
    formUserName: "",
  },
  auth: { accountFlag: false },
};

export type stateType = typeof initialState;

// reducer
export const reducer = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    // sign-in form
    case "CHANGE_EMAIL_FORM":
      return {
        ...state,
        authForm: { ...state.authForm, formEmail: action.payload },
      };
    case "CHANGE_PASSWORD_FORM":
      return {
        ...state,
        authForm: { ...state.authForm, formPassword: action.payload },
      };
    case "CHANGE_USERNAME":
      return {
        ...state,
        authForm: { ...state.authForm, formUserName: action.payload },
      };
    // auth
    case "CHANGE_ACCOUNT_FRAG":
      return {
        ...state,
        auth: { ...state.auth, accountFlag: action.payload },
      };

    default:
      return state;
  }
};

let store: any;

const initStore = (preloadedState = initialState) => {
  return createStore(
    reducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(logger))
  );
};

export const initializeStore = (preloadedState: stateType) => {
  // if store is null or undefined, return initStore(preloadedState)
  let _store = store ?? initStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === "undefined") {
    return _store;
  }
  // Create the store once in the client
  if (!store) {
    store = _store;
  }

  return _store;
};

export const useStore = (initialState: stateType) => {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
};

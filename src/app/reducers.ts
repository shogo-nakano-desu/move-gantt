import { createStore } from "redux";

// actions
export const CHANGE_EMAIL_FORM = "CHANGE_EMAIL_FORM";
export const emailForm = (email: string) => ({
  type: "CHANGE_EMAIL_FOR",
  payload: email,
});

export const CHANGE_PASSWORD_FORM = "CHANGE_PASSWORD_FORM";
export const passwordForm = (password: string) => ({
  type: "CHANGE_PASSWORD_FORM",
  payload: password,
});

export const changeUserName = (userName: string) => ({
  type: "CHANGE_USERNAME",
  payload: userName,
});

export const signIn = () => ({
  type: "SIGN_IN",
  payload: true,
});

export const signOut = () => ({
  type: "SIGN_OUT",
  payload: false,
});

export const initialState = {
  authForm: {
    email: "",
    password: "",
    userName: "",
  },
  auth: { user: null, isSignIn: false },
};

export interface authFormType {
  email: string;
  password: string;
  userName: string;
}

export interface authType {
  user: any;
  isSignIn: boolean;
}

export interface stateType {
  authForm: authFormType;
  auth: authType;
}

// reducer
export const reducers = (state = initialState, action: any) => {
  switch (action.type) {
    // sign-in form
    case "CHANGE_EMAIL_FORM":
      return { ...state, email: action.payload };
    case "CHANGE_PASSWORD_FORM":
      return { ...state, password: action.payload };
    case "CHANGE_USERNAME":
      return { ...state, userName: action.payload };
    // auth
    case "SIGN_IN":
      return {
        ...state,
        user: action.payload.user,
        isSignIn: action.payload.isSignIn,
      };
    case "SIGN_OUT":
      return {
        ...state,
        user: null,
        isSignIn: action.payload.isSignIn,
      };
    default:
      return state;
  }
};

export const store = createStore(reducers, initialState);

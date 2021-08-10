import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import {
  useSelector as rawUseSelector,
  TypedUseSelectorHook,
} from "react-redux";
import userReducer from "../features/user/userSlice";

// storeを作っている
export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

// middlewareを調整したり、sliceを追加したりした際に、型を使えるようにするために書いている。
// これら２つはほぼ定型文
// Infer the types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {user: userReducer}
export type AppDispatch = typeof store.dispatch;

export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

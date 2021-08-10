import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface USER {
  uid: string;
  display_name: string;
}
export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: { uid: "", display_name: "" },
  },
  reducers: {
    login: (state, action: PayloadAction<USER>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = { uid: "", display_name: "" };
    },
  },
});

export const { login, logout } = userSlice.actions;
export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;

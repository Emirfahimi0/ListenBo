import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";

declare interface IInitialState {
  user: IUserProfile | null;
  isLoggedIn: boolean;
}
const initialState: IInitialState = {
  user: null,
  isLoggedIn: false,
};

const slice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    updateProfile: (state, action: PayloadAction<IUserProfile | null>) => {
      state.user = action.payload;
    },
    updateLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const authState = (state: RootState) => state.auth;

export const { updateProfile, updateLoggedIn } = slice.actions;

export default slice.reducer;

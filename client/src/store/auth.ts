import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";

declare interface IInitialState {
  isBusy: boolean;
  isLoggedIn: boolean;
  user: IUserProfile | null;
}
const initialState: IInitialState = {
  isBusy: false,
  isLoggedIn: false,
  user: null,
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
    updateBusyState: (state, action: PayloadAction<boolean>) => {
      state.isBusy = action.payload;
    },
  },
});

export const authState = (state: RootState) => state.auth;

export const { updateProfile, updateLoggedIn, updateBusyState } = slice.actions;

export default slice.reducer;

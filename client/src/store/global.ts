import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";

declare interface IInitialState {
  currentContent: CurrentContentModal[];
  countDown: number | undefined;
  isCountDown: boolean;
}

const initialState: IInitialState = {
  currentContent: [],
  countDown: undefined,
  isCountDown: false,
};

const slice = createSlice({
  name: "Global",
  initialState: initialState,
  reducers: {
    updateCountDown: (state, action: PayloadAction<number>) => {
      state.countDown = action.payload;
    },
    resetCountDown: (state, action: PayloadAction<boolean>) => {
      state.isCountDown = action.payload;
    },
    updateCurrentContent: (state, action: PayloadAction<CurrentContentModal[]>) => {
      state.currentContent = action.payload;
    },
  },
});

export const globalState = (state: RootState) => state.global;

export const { updateCountDown, resetCountDown, updateCurrentContent } = slice.actions;
export default slice.reducer;

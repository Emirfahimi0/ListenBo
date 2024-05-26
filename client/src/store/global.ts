import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";

interface IMessageNotification {
  message: string;
  type: "success" | "error";
}
declare interface IInitialState {
  currentContent: CurrentContentModal[];
  countDown: number | undefined;
  isCountDown: boolean;
  messageNotification: IMessageNotification;
}

const initialState: IInitialState = {
  currentContent: [],
  countDown: undefined,
  isCountDown: false,
  messageNotification: {
    message: "",
    type: "success",
  },
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
    updateNotification: (state, { payload }: PayloadAction<IMessageNotification>) => {
      state.messageNotification.message = payload.message;
      state.messageNotification.type = payload.type;
    },
  },
});

export const globalState = (state: RootState) => state.global;

export const { updateCountDown, resetCountDown, updateCurrentContent, updateNotification } = slice.actions;
export default slice.reducer;

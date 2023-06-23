import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  title: "",
  content: "",
  primaryButtonText: "",
  cancelButtonText: "",
  onPrimaryButtonClick: undefined,
};

const dialogContainerSlice = createSlice({
  name: "dialogContainer",
  initialState,
  reducers: {
    openDialog: (state, action) => {
      state.title = action.payload.title;
      state.content = action.payload.content;
      state.primaryButtonText = action.payload.primaryButtonText;
      state.cancelButtonText = action.payload.cancelButtonText;
      state.onPrimaryButtonClick = action.payload.onPrimaryButtonClick;
      state.isOpen = true;
    },
    closeDialog: (state) => {
      state.isOpen = false;
      state.title = "";
      state.content = "";
      state.primaryButtonText = "";
      state.cancelButtonText = "";
      state.onPrimaryButtonClick = undefined;
    },
  },
});

export default dialogContainerSlice.reducer;

export const { openDialog, closeDialog } = dialogContainerSlice.actions;

export const isOpenSelector = (state) => state.dialogContainer.isOpen;
export const titleSelector = (state) => state.dialogContainer.title;
export const contentSelector = (state) => state.dialogContainer.content;
export const primaryButtonTextSelector = (state) =>
  state.dialogContainer.primaryButtonText;
export const cancelButtonTextSelector = (state) =>
  state.dialogContainer.cancelButtonText;
export const onPrimaryButtonClickSelector = (state) =>
  state.dialogContainer.onPrimaryButtonClick;

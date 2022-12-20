import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getAllNewMaterials } from "./newMaterialsAPI";

const initialState = {
  newMaterials: [],
  newMaterialsLoading: false,
  error: null,
};

export const getNewMaterialsAsync = createAsyncThunk(
  "allNewMaterials/getAllNewMaterials",
  async () => {
    const response = await getAllNewMaterials();
    return response;
  }
);

export const newMaterialsSlice = createSlice({
  name: "allNewMaterials",
  initialState,
  reducers: {},
  extraReducers: {
    [getNewMaterialsAsync.pending]: (state, action) => {
      state.newMaterialsLoading = true;
    },
    [getNewMaterialsAsync.fulfilled]: (state, action) => {
      state.newMaterials = action.payload;
      state.newMaterialsLoading = false;
    },
    [getNewMaterialsAsync.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
  },
});

export default newMaterialsSlice.reducer;

export const selectNewMaterials = (state) => state.allNewMaterials.newMaterials;
export const selectNewMaterialsLoading = (state) =>
  state.allNewMaterials.newMaterialsLoading;

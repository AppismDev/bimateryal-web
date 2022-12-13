import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getNewMaterials } from "./newProductsAPI";

const initialState = {
  products: [],
  isLoading: false,
  error: null,
};

export const getNewMaterialsAsync = createAsyncThunk(
  "newProducts/getNewProducts",
  async () => {
    const data = await getNewMaterials();

    return data;
  }
);

export const newProductsSlice = createSlice({
  name: "newProducts",
  initialState,
  reducers: {},

  extraReducers: {
    [getNewMaterialsAsync.pending]: (state) => {
      state.isLoading = true;
    },
    [getNewMaterialsAsync.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    },
    [getNewMaterialsAsync.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
      toast.error("Yeni materyaller yüklenemedi.");
    },
  },
});

export default newProductsSlice.reducer;
export const selectNewProducts = (state) => state.newMaterials.products;
export const selectNewProductsLoading = (state) => state.newMaterials.isLoading;
export const selectNewProductsError = (state) => state.newMaterials.error;

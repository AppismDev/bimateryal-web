import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getCategoryMaterials } from "./categoryMaterialsAPI";

const initialState = {
  categoryMaterials: [],
  loading: false,
  error: null,
  page: 0,
};

export const getCategoryMaterialsAsync = createAsyncThunk(
  "categoryMaterials/getCategoryMaterialsAsync",
  async ({ page, categoryId }) => {
    try {
      console.log(
        "getCategoryMaterialsAsync id : " + JSON.stringify(categoryId)
      );
      const response = await getCategoryMaterials(page, categoryId);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const categoryMaterialsSlice = createSlice({
  name: "categoryMaterials",

  initialState,

  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    clearState: (state) => {
      state.categoryMaterials = [];
      state.loading = false;
      state.error = null;
      state.page = 0;
    },
  },

  extraReducers: {
    [getCategoryMaterialsAsync.pending]: (state) => {
      state.loading = true;
    },
    [getCategoryMaterialsAsync.fulfilled]: (state, action) => {
      state.loading = false;
      state.categoryMaterials = action.payload;
      toast.success("Kategoriye ait materyaller yüklendi.");
    },
    [getCategoryMaterialsAsync.rejected]: (state, action) => {
      state.loading = false;
      toast.error("Kategoriye ait materyaller yüklenemedi.");
      state.error = action.error.message;
    },
  },
});

export const { setPage, clearState } = categoryMaterialsSlice.actions;

export const selectCategoryMaterials = (state) =>
  state.categoryMaterials.categoryMaterials;
export const selectCategoryMaterialsLoading = (state) =>
  state.categoryMaterials.loading;
export const selectCategoryMaterialsError = (state) =>
  state.categoryMaterials.error;
export const selectCategoryMaterialsPage = (state) =>
  state.categoryMaterials.page;

export default categoryMaterialsSlice.reducer;

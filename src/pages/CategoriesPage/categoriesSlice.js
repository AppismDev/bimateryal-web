import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCategories, getSubcategories } from "./categoriesAPI";

const initialState = {
  categories: [],
  subcategories: [],

  categoriesLoading: false,
  subcategoriesLoading: false,

  error: null,
};

export const getCategoriesAsync = createAsyncThunk(
  "categories/getCategories",
  async () => {
    const response = await getCategories();
    return response;
  }
);

export const getSubCategoriesAsync = createAsyncThunk(
  "categories/getSubCategories",
  async () => {
    const response = await getSubcategories();
    return response;
  }
);

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories(state, action) {
      state.categories = action.payload;
    },
    setSubcategories(state, action) {
      state.subcategories = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategoriesAsync.pending, (state) => {
        state.categoriesLoading = true;
      })
      .addCase(getCategoriesAsync.fulfilled, (state, action) => {
        state.categoriesLoading = false;
        state.categories = action.payload;
        console.log("action.payload is ", action.payload);
      })
      .addCase(getCategoriesAsync.rejected, (state, action) => {
        state.categoriesLoading = false;
        state.error = action.error.message;
      })
      .addCase(getSubCategoriesAsync.pending, (state) => {
        state.subcategoriesLoading = true;
      })
      .addCase(getSubCategoriesAsync.fulfilled, (state, action) => {
        state.subcategoriesLoading = false;
        state.subcategories = action.payload;
        console.log("action.payload is ", action.payload);
      })
      .addCase(getSubCategoriesAsync.rejected, (state, action) => {
        state.subcategoriesLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { setCategories, setSubcategories } = categoriesSlice.actions;

export const categoriesSelector = (state) => state.categories.categories;
export const categoriesLoadingSelector = (state) =>
  state.categories.categoriesLoading;
export const subcategoriesSelector = (state) => state.categories.subcategories;
export const subcategoriesLoadingSelector = (state) =>
  state.categories.subcategoriesLoading;
export const errorSelector = (state) => state.categories.error;

export default categoriesSlice.reducer;

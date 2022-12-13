import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getTopFiveCategories } from "./homePageCategoriesAPI";

const initialState = {
  topFiveCategories: [],
  topFiveCategoriesLoading: false,
  error: null,
};

export const getTopFiveCategoriesAsync = createAsyncThunk(
  "homePageCategories/getTopFiveCategories",
  async () => {
    const response = await getTopFiveCategories();

    console.log("response", response);
    return response;
  }
);

export const homePageCategoriesSlice = createSlice({
  name: "homePageCategories",
  initialState,
  reducers: {
    setTopFiveCategories(state, action) {
      state.topFiveCategories = action.payload;
    },
  },
  extraReducers: {
    [getTopFiveCategoriesAsync.pending]: (state, action) => {
      state.topFiveCategoriesLoading = true;
      // toast.promise(getTopFiveCategoriesAsync(), {
      //   pending: "Kategoriler yükleniyor...",
      //   success: "Kategoriler yüklendi.",
      //   error: "Kategoriler yüklenemedi.",
      // });
    },
    [getTopFiveCategoriesAsync.fulfilled]: (state, action) => {
      state.topFiveCategoriesLoading = false;
      state.topFiveCategories = action.payload;
      // toast.success("Kategoriler yüklendi.");
    },
    [getTopFiveCategoriesAsync.rejected]: (state, action) => {
      state.topFiveCategoriesLoading = false;
      state.error = action.error.message;
      toast.error("Kategoriler yüklenemedi.");
    },
  },
});

export const { setTopFiveCategories } = homePageCategoriesSlice.actions;
export default homePageCategoriesSlice.reducer;

export const selectTopFiveCategories = (state) =>
  state.homePageCategories.topFiveCategories;
export const selectTopFiveCategoriesLoading = (state) =>
  state.homePageCategories.topFiveCategoriesLoading;

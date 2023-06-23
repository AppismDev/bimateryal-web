import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  searchCategories,
  searchMaterials,
  searchSubCategories,
  searchUsers,
} from "./searchbarAPI";

const initialState = {
  searchQuery: "",
  searchedUsers: undefined,
  searchedMaterials: undefined,
  searchedCategories: undefined,
  searchedSubCategories: undefined,
  searchError: null,
  usersLoading: false,
  materialsLoading: false,
  categoriesLoading: false,
  subCategoriesLoading: false,
};

export const searchMaterialsAsync = createAsyncThunk(
  "searchbar/searchMaterials",
  async (searchQuery, { rejectWithValue }) => {
    const response = await searchMaterials(searchQuery);
    return response;
  }
);

export const searchSubCategoriesAsync = createAsyncThunk(
  "searchbar/searchSubCategories",
  async (searchQuery, { rejectWithValue }) => {
    const response = await searchSubCategories(searchQuery);
    return response;
  }
);

export const searchUsersAsync = createAsyncThunk(
  "searchbar/searchUsersAsync",
  async (searchQuery, { rejectWithValue }) => {
    try {
      const response = await searchUsers(searchQuery);
      return response;
    } catch (error) {
      console.log("error is ", error);
    }
  }
);

export const searchCategoriesAsync = createAsyncThunk(
  "searchbar/searchCategoriesAsync",
  async (searchQuery, { rejectWithValue }) => {
    try {
      const response = await searchCategories(searchQuery);
      return response;
    } catch (error) {
      console.log("error is ", error);
    }
  }
);

const searchbarSlice = createSlice({
  name: "searchbar",
  initialState,
  reducers: {
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    clearSearchBar(state, action) {
      state.searchQuery = "";
      state.searchedUsers = undefined;
      state.searchedMaterials = undefined;
      state.searchedCategories = undefined;
      state.searchedSubCategories = undefined;
      state.searchError = null;
    },
  },
  extraReducers: {
    [searchCategoriesAsync.pending]: (state, action) => {
      state.categoriesLoading = true;
    },

    [searchCategoriesAsync.fulfilled]: (state, action) => {
      state.categoriesLoading = false;
      state.searchedCategories = action.payload;
    },

    [searchCategoriesAsync.rejected]: (state, action) => {
      state.categoriesLoading = false;
      state.searchError = action.payload;
    },

    [searchMaterialsAsync.pending]: (state, action) => {
      state.materialsLoading = true;
    },
    [searchMaterialsAsync.fulfilled]: (state, action) => {
      state.materialsLoading = false;
      state.searchedMaterials = action.payload;
    },
    [searchMaterialsAsync.rejected]: (state, action) => {
      state.materialsLoading = false;
      state.searchError = action.payload;
    },
    [searchSubCategories.pending]: (state, action) => {
      state.subCategoriesLoading = true;
    },
    [searchSubCategories.fulfilled]: (state, action) => {
      state.subCategoriesLoading = false;
      state.searchedSubCategories = action.payload;
    },
    [searchSubCategories.rejected]: (state, action) => {
      state.subCategoriesLoading = false;
      state.searchError = action.payload;
    },
    [searchUsersAsync.pending]: (state, action) => {
      state.usersLoading = true;
    },
    [searchUsersAsync.fulfilled]: (state, action) => {
      state.usersLoading = false;
      state.searchedUsers = action.payload;
    },
    [searchUsersAsync.rejected]: (state, action) => {
      state.usersLoading = false;
      state.searchError = action.payload;
    },
  },
});

export const { setSearchQuery, clearSearchBar } = searchbarSlice.actions;

export const searchQuerySelector = (state) => state.searchbar.searchQuery;
export const searchedUsersSelector = (state) => state.searchbar.searchedUsers;
export const searchedMaterialsSelector = (state) =>
  state.searchbar.searchedMaterials;
export const searchedCategoriesSelector = (state) =>
  state.searchbar.searchedCategories;
export const searchedSubCategoriesSelector = (state) =>
  state.searchbar.searchedSubCategories;

export const searchErrorSelector = (state) => state.searchbar.searchError;
export const usersLoadingSelector = (state) => state.searchbar.usersLoading;
export const materialsLoadingSelector = (state) =>
  state.searchbar.materialsLoading;
export const categoriesLoadingSelector = (state) =>
  state.searchbar.categoriesLoading;
export const subCategoriesLoadingSelector = (state) =>
  state.searchbar.subCategoriesLoading;

export default searchbarSlice.reducer;

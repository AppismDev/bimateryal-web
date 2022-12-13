import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getPopularUsers } from "./popularUsersAPI";

const initialState = {
  popularUsers: [],
  popularUsersLoading: false,
  error: null,
  isLoading: false,
};

export const getPopularUsersAsync = createAsyncThunk(
  "popularUsers/getPopularUsers",
  async () => {
    const response = await getPopularUsers();

    return response;
  }
);

export const popularUsersSlice = createSlice({
  name: "popularUsers",
  initialState,
  reducers: {
    setPopularUsers(state, action) {
      state.popularUsers = action.payload;
    },
  },
  extraReducers: {
    [getPopularUsersAsync.pending]: (state, action) => {
      state.isLoading = true;
      // toast.promise(getTopFiveCategoriesAsync(), {
      //   pending: "Kategoriler yükleniyor...",
      //   success: "Kategoriler yüklendi.",
      //   error: "Kategoriler yüklenemedi.",
      // });
    },
    [getPopularUsersAsync.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.popularUsers = action.payload;
      // toast.success("Kategoriler yüklendi.");
    },
    [getPopularUsersAsync.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
      toast.error("Kategoriler yüklenemedi.");
    },
  },
});

export const { setPopularUsers } = popularUsersSlice.actions;
export default popularUsersSlice.reducer;

export const selectPopularUsers = (state) => state.popularUsers.popularUsers;
export const selectPopularUsersLoading = (state) =>
  state.popularUsers.popularUsersLoading;

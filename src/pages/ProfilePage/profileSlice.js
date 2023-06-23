import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserFromFirestore } from "../../services/firebase/UserService";
import { getActiveMaterialPosts } from "./profileAPI";

const initialState = {
  user: null,
  isLoading: false,
  isUserMaterialLoading: false,
  userMaterials: [],
  userAddresses: [],
  error: null,
};

// create async thunk
export const fetchUser = createAsyncThunk("profile/fetchUser", async (uid) => {
  const userFromFirebase = await getUserFromFirestore(uid);
  return userFromFirebase;
});

export const fetchUserMaterials = createAsyncThunk(
  "profile/fetchUserMaterials",
  async (uid) => {
    const userMaterialsFromFirebase = await getActiveMaterialPosts(uid);
    return userMaterialsFromFirebase;
  }
);

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    // add reducer here
    clearState: (state) => {
      state.user = null;
      state.isLoading = false;
      state.isUserMaterialLoading = false;
      state.userMaterials = [];
      state.userAddresses = [];
      state.error = null;
    },
  },

  extraReducers: {
    [fetchUser.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    [fetchUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [fetchUserMaterials.pending]: (state, action) => {
      state.isMaterialLoading = true;
    },
    [fetchUserMaterials.fulfilled]: (state, action) => {
      state.isMaterialLoading = false;
      state.userMaterials = action.payload;
    },
    [fetchUserMaterials.rejected]: (state, action) => {
      state.isMaterialLoading = false;
      state.error = action.payload;
    },
  },
});

export const selectUser = (state) => state.profile.user;
export const selectIsLoading = (state) => state.profile.isLoading;
export const selectError = (state) => state.profile.error;
export const selectUserMaterials = (state) => state.profile.userMaterials;
export const selectUserMaterialLoading = (state) =>
  state.profile.isUserMaterialLoading;
export const { clearState } = profileSlice.actions;

export default profileSlice.reducer;

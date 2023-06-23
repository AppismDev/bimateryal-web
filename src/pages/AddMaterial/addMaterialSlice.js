import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addMaterial } from "./addMaterialAPI";

const initialState = {
  isLoading: false,
  isMainPhotoDragActive: false,
  isMaterialPhotosDragActive: false,
  mainPhoto: undefined,
  error: undefined,
  media: [],
  materialName: "",
  materialCategory: "",
  materialSubCategory: "",
  materialPrice: 0,
  materialDescription: "",
};

export const addMaterialAsync = createAsyncThunk(
  "addMaterial/addMaterialAsync",
  async (data, thunkAPI) => {
    await addMaterial(data);
  }
);

export const addMaterialSlice = createSlice({
  name: "addMaterial",
  initialState,
  reducers: {
    setMainPhoto(state, action) {
      state.mainPhoto = action.payload;
    },
    setIsMainPhotoDragActive(state, action) {
      state.isMainPhotoDragActive = action.payload;
    },
    setMaterialName(state, action) {
      state.materialName = action.payload;
    },
    setMaterialCategory(state, action) {
      state.materialCategory = action.payload;
    },
    setMaterialSubCategory(state, action) {
      state.materialSubCategory = action.payload;
    },
    setMaterialPrice(state, action) {
      state.materialPrice = action.payload;
    },
    setMaterialDescription(state, action) {
      state.materialDescription = action.payload;
    },
    setMaterialMedia(state, action) {
      state.media = action.payload;
    },
    setIsMaterialMediasDragActive(state, action) {
      state.isMaterialPhotosDragActive = action.payload;
    },
    clearState(state, action) {
      state.isLoading = false;
      state.isMainPhotoDragActive = false;
      state.isMaterialPhotosDragActive = false;
      state.mainPhoto = undefined;
      state.error = undefined;
      state.media = [];
      state.materialName = "";
      state.materialCategory = "";
      state.materialSubCategory = "";
      state.materialPrice = 0;
      state.materialDescription = "";
    },
  },
  extraReducers: {
    [addMaterialAsync.pending]: (state, action) => {
      state.isLoading = true;
    },
    [addMaterialAsync.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = undefined;
    },
    [addMaterialAsync.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
  },
});

export const {
  setMainPhoto,
  setIsMainPhotoDragActive,
  setMaterialCategory,
  setMaterialDescription,
  setMaterialMedia,
  setMaterialName,
  setMaterialPrice,
  setMaterialSubCategory,
  setIsMaterialMediasDragActive,
  clearState,
} = addMaterialSlice.actions;

export const materialName = (state) => state.addMaterial.materialName;

export const materialCategory = (state) => state.addMaterial.materialCategory;

export const materialSubCategory = (state) =>
  state.addMaterial.materialSubCategory;

export const materialPrice = (state) => state.addMaterial.materialPrice;

export const materialDescription = (state) =>
  state.addMaterial.materialDescription;

export const materialMedia = (state) => state.addMaterial.media;
export const isMainPhotoDragActive = (state) =>
  state.addMaterial.isMainPhotoDragActive;

export const mainPhoto = (state) => state.addMaterial.mainPhoto;

export const isMaterialPhotosDragActive = (state) =>
  state.addMaterial.isMaterialPhotosDragActive;

export const isLoading = (state) => state.addMaterial.isLoading;

export const allStateValue = (state) => state.addMaterial;

export default addMaterialSlice.reducer;

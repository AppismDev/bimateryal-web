import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  approveMaterialRequest,
  getMaterialRequests,
  rejectMaterialRequest,
  requestMaterial,
} from "./materialDetailsAPI";

const initialState = {
  isMaterialRequestsLoading: false,
  loading: false,
  error: null,
  isDialogOpen: false,
  materialRequests: [],
};

export const getMaterialRequestsAsync = createAsyncThunk(
  "materialDetails/getMaterialRequestsAsync",
  async (materialId) => {
    const response = await getMaterialRequests(materialId);
    return response;
  }
);

export const addMaterialRequestAsync = createAsyncThunk(
  "materialDetails/addMaterialRequestAsync",
  async ({
    materialId,
    ownerId,
    requestorId,
    description,
    price,
    addressId,
    materialName,
  }) => {
    const response = await requestMaterial({
      materialId,
      ownerId,
      requestorId,
      description,
      price,
      addressId,
      materialName,
    });
    return response;
  }
);

export const approveMaterialRequestAsync = createAsyncThunk(
  "materialDetails/approveMaterialRequestAsync",
  async ({
    materialId,
    ownerId,
    requestorId,
    materialName,
    requestId,
    materialPrice,
  }) => {
    // wait for 5 seconds to simulate a slow network
    // await new Promise((resolve) => setTimeout(resolve, 5000));
    const response = await approveMaterialRequest({
      requestId,
      materialId,
      ownerId,
      requestorId,
      materialName,
      materialPrice,
    });
    return requestId;
  }
);
export const rejectMaterialRequestAsync = createAsyncThunk(
  "materialDetails/rejectMaterialRequestAsync",
  async ({
    materialId,
    ownerId,
    requestorId,
    materialName,
    requestId,
    materialPrice,
  }) => {
    // wait for 5 seconds to simulate a slow network
    // await new Promise((resolve) => setTimeout(resolve, 5000));
    const response = await rejectMaterialRequest({
      requestId,
      materialId,
      ownerId,
      requestorId,
      materialName,
      materialPrice,
    });
    return requestId;
  }
);

const materialDetailsSlice = createSlice({
  name: "materialDetails",
  initialState,
  reducers: {
    openDialog: (state) => {
      state.isDialogOpen = true;
    },
    closeDialog: (state) => {
      state.isDialogOpen = false;
    },
  },
  extraReducers: {
    [addMaterialRequestAsync.pending]: (state) => {
      state.loading = true;
    },
    [addMaterialRequestAsync.fulfilled]: (state) => {
      state.loading = false;
      toast.success("Talep gönderildi.");
    },
    [addMaterialRequestAsync.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      console.log(action.error.message);
      toast.error("Talep gönderilirken bir hata oluştu.");
    },
    [getMaterialRequestsAsync.pending]: (state) => {
      state.isMaterialRequestsLoading = true;
    },
    [getMaterialRequestsAsync.fulfilled]: (state, action) => {
      state.isMaterialRequestsLoading = false;
      state.materialRequests = action.payload;
    },
    [getMaterialRequestsAsync.rejected]: (state, action) => {
      state.isMaterialRequestsLoading = false;
      state.error = action.error.message;
      console.log(action.error.message);
    },

    [rejectMaterialRequestAsync.fulfilled]: (state, action) => {
      state.loading = false;
      // remove the rejected request from the list
      state.materialRequests = state.materialRequests.filter(
        (request) => request.id !== action.payload
      );
    },

    [rejectMaterialRequestAsync.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      console.log(action.error.message);
    },

    [approveMaterialRequestAsync.fulfilled]: (state, action) => {
      state.loading = false;
      // remove the rejected requests from the list and add update the approved request
      state.materialRequests = state.materialRequests.filter(
        (request) => request.id === action.payload
      );

      const requestIndex = state.materialRequests.findIndex(
        (request) => request.id === action.payload
      );
      state.materialRequests[requestIndex].status = "approved";
    },
  },
});

export default materialDetailsSlice.reducer;
export const { openDialog, closeDialog } = materialDetailsSlice.actions;

export const isLoadingSelector = (state) => state.materialDetails.loading;
export const errorSelector = (state) => state.materialDetails.error;
export const isDialogOpenSelector = (state) =>
  state.materialDetails.isDialogOpen;
export const isMaterialRequestsLoadingSelector = (state) =>
  state.materialDetails.isMaterialRequestsLoading;
export const materialRequestsSelector = (state) =>
  state.materialDetails.materialRequests;

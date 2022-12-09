import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import signInWithGoogle from "./signInAPI";

const initialState = {
    isLoading: false,
    user: undefined,
    error: undefined,

};

export const loginWithGoogle = createAsyncThunk(
    "user/loginWithGoogle",
    async () => {
        var user = await signInWithGoogle()
        return user;
    }
);

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = undefined;
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(loginWithGoogle.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginWithGoogle.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload
            })
            .addCase(loginWithGoogle.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error;
            });
    }
});

// export const { } = userSlice.actions;
export const user = (state) => state.user.user;
export default userSlice.reducer;
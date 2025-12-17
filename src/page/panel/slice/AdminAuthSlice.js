//token ??

import {createAsyncThunk, createSlice, isPending, isRejected} from "@reduxjs/toolkit";
import request from "../../../api/apiClient.js";
import {skipToken} from "@reduxjs/toolkit/query";

export const fetchAdminLogin = createAsyncThunk("panel/auth/login", async (body) => {
    const response = await request.panelAuth.login(body);
    return response;
})


const initialState = {
    name: null,
    token: null
}

export const adminAuthSlice = createSlice({
    name: 'adminAuth',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAdminLogin.fulfilled, (state, action) => {
            let token = action.payload;
            state.token = token;
            localStorage.setItem("adminAccessToken",token)
            state.loading = false;
        })
            .addMatcher(isPending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addMatcher(isRejected, (state, action) => {
                state.loading = false;
                state.error = "Beklenmeyen bir hata oluştu " + (action.error.message || "Bilinmiyor");
            })
    }
});

export default adminAuthSlice.reducer;
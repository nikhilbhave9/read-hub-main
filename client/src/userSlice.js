import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    status: "loading",
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
            state.status = "authenticated";
        },
        logout: (state) => {
            state.user = null;
            state.status = "unauthenticated";
        }
    },
});

export const { login, logout } = userSlice.actions;
export const selectUser = (state) => state.user.user;
export const selectStatus = (state) => state.user.status;
export default userSlice.reducer;
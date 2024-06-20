import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    auth: localStorage.getItem("auth") ? JSON.parse(localStorage.getItem("auth")) : null,
};

const artistSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        user: (state, action) => {
            const { _id, phoneNumber,name, role, isSalon } = action.payload;
            state.auth = { _id, phoneNumber,name ,role, isSalon };
            localStorage.setItem("auth", JSON.stringify(state.auth));
        },
        clearUser: (state) => {
            state.auth = null;
            localStorage.removeItem("auth");
        },
    },
});

export const { user, clearUser } = artistSlice.actions;

export default artistSlice.reducer;
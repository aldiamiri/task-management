import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const user = createSlice({
  initialState,
  name: "user",
  reducers: {
    UseLogin: (state, action) => {
      state.user = action.payload;
    },
    UseLogout: (state) => {
      state.user = null;
    },
  },
});

export const { UseLogin, UseLogout } = user.actions;

export default user.reducer;

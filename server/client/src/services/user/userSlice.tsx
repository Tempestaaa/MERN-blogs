import { createSlice } from "@reduxjs/toolkit";
import { userTypes } from "../../types/userTypes";

type initialStateType = {
  users: Omit<userTypes[], "_id">;
  isLoading: boolean;
  error: string | null;
};

const initialState: initialStateType = {
  users: [],
  isLoading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.users = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { signInStart, signInSuccess, signInFailure } = userSlice.actions;

export default userSlice.reducer;

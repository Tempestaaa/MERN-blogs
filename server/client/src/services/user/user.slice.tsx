import { createSlice } from "@reduxjs/toolkit";
import { userTypes } from "../../types/userTypes";

type initialStateType = {
  currentUser: userTypes;
  isLoading: boolean;
  error: string | null;
};

const initialState: initialStateType = {
  currentUser: {
    username: "",
    email: "",
    password: "",
    profilePicture: "",
  },
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
      state.currentUser = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    updateSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    updateFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    deleteUserStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    deleteUserSuccess: (state) => {
      state.currentUser = initialState.currentUser;
      state.isLoading = false;
      state.error = null;
    },
    deleteUserFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    signOutSuccess: (state) => {
      state.currentUser = initialState.currentUser;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutSuccess,
} = userSlice.actions;

export default userSlice.reducer;

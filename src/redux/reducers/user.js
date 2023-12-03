import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  loading: true,
};

export const userReducer = createReducer(initialState, {
  LoadUserRequest: (state) => {
    state.loading = true;
  },
  LoadUserSuccess: (state, action) => {
    state.isAuthenticated = true;
    state.loading = false;
    state.user = action.payload;
  },
  LoadUserFail: (state, action) => {
    state.isAuthenticated = false;
    state.loading = false;
    state.error = action.payload;
  },
  // update user information
  updateUserInfoRequest: (state) => {
    state.loading = true;
  },
  updateUserInfoSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
  },
  updateUserInfoFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  // update user address
  updateUserAddressRequest: (state) => {
    state.addressLoading = true;
  },
  updateUserAddressSuccess: (state, action) => {
    state.addressLoading = false;
    state.successMessage = action.payload.successMessage;
    state.user = action.payload.user;
  },
  updateUserAddressFail: (state, action) => {
    state.addressLoading = false;
    state.error = action.payload;
  },
  // delete user address
  deleteUserAddressRequest: (state) => {
    state.addressLoading = true;
  },
  deleteUserAddressSuccess: (state, action) => {
    state.addressLoading = false;
    state.successMessage = action.payload.successMessage;
    state.user = action.payload.user;
  },
  deleteUserAddressFail: (state, action) => {
    state.addressLoading = false;
    state.error = action.payload;
  },
  // get all users --- admin
  getAllUsersRequest: (state) => {
    state.usersLoading = true;
  },
  getAllUsersSuccess: (state, action) => {
    state.usersLoading = false;
    state.users = action.payload;
  },
  getAllUsersFail: (state, action) => {
    state.usersLoading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
  clearMessages: (state) => {
    state.successMessage = null;
  },
});

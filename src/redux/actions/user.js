import axios from "axios";

import { server } from "../../server";

// clear errors
export const clearErrors = () => (dispatch) => {
  dispatch({ type: "clearErrors" });
};

// clear messages
export const clearMessages = () => (dispatch) => {
  dispatch({ type: "clearMessages" });
};

// load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: "LoadUserRequest" });
    const { data } = await axios.get(`${server}/user/getUser`, {
      withCredentials: true,
    });
    dispatch({ type: "LoadUserSuccess", payload: data.user });
  } catch (error) {
    // console.log("loadUser Fail", error);
    dispatch({ type: "LoadUserFail", payload: error.response.data.message });
  }
};

// load seller
export const loadSeller = () => async (dispatch) => {
  try {
    dispatch({ type: "LoadSellerRequest" });
    const { data } = await axios.get(`${server}/shop/getSeller`, {
      withCredentials: true,
    });
    dispatch({ type: "LoadSellerSuccess", payload: data.seller });
    // console.log("loadSeller Success", data.seller);
  } catch (error) {
    // console.log("loadSeller Fail", error);
    dispatch({ type: "LoadSellerFail", payload: error.response.data.message });
  }
};

// update user information
export const updateUserInformation =
  (name, email, phoneNumber, password) => async (dispatch) => {
    try {
      dispatch({
        type: "updateUserInfoRequest",
      });

      const { data } = await axios.put(
        `${server}/user/update-user-info`,
        { email, password, phoneNumber, name },
        { withCredentials: true }
      );
      dispatch({
        type: "updateUserInfoSuccess",
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: "updateUserInfoFail",
        payload: error.response.data.message,
      });
    }
  };

// update user address
export const updateUserAddress =
  (country, city, address1, address2, zipCode, addressType) =>
  async (dispatch) => {
    try {
      dispatch({ type: "updateUserAddressRequest" });

      const { data } = await axios.put(
        `${server}/user/update-user-addresses`,
        {
          country,
          city,
          address1,
          address2,
          zipCode,
          addressType,
        },
        { withCredentials: true }
      );
      dispatch({
        type: "updateUserAddressSuccess",
        payload: {
          successMessage: "User address updated successfully!",
          user: data.user,
        },
      });
    } catch (error) {
      dispatch({
        type: "updateUserAddressFail",
        payload: error.response.data.message,
      });
    }
  };

// delete user address
export const deleteUserAddress = (id) => async (dispatch) => {
  try {
    dispatch({ type: "deleteUserAddressRequest" });

    const { data } = await axios.delete(
      `${server}/user/delete-user-address/${id}`,
      { withCredentials: true }
    );
    dispatch({
      type: "deleteUserAddressSuccess",
      payload: {
        successMessage: "Address deleted successfully!",
        user: data.user,
      },
    });
  } catch (error) {
    dispatch({
      type: "deleteUserAddressFail",
      payload: error.response.data.message,
    });
  }
};

// get all users --- admin
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllUsersRequest",
    });

    const { data } = await axios.get(`${server}/user/admin-all-users`, {
      withCredentials: true,
    });

    dispatch({
      type: "getAllUsersSuccess",
      payload: data.users,
    });
  } catch (error) {
    dispatch({
      type: "getAllUsersFail",
      payload: error.response.data.message,
    });
  }
};

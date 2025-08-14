/* eslint-disable no-unused-vars */
import { axios } from "./Store/Axios";
import { state } from "../data/state";
import { baseURL, getHeader } from "./const_API";
import { FailureAlert } from "../components/Toast";

// USER LOGIN
export const login = async (email, password) => {
  try {
    let res = await axios.post(`${baseURL}/store-users/admin/login`, {
      email,
      password,
    });
    if (res?.status === 200) {
      const token = sessionStorage.setItem("token", res?.data?.data?.jwt);
      return res;
    }
  } catch (error) {
    console.log(error);
    FailureAlert("Email or password is incorrect");
  }
  return false;
};

export const checkUserType = async () => {
  try {
    let res = await axios.get(`${baseURL}/users/me?populate=role`, getHeader());
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const forgetPassword = async (data) => {
  try {
    let res = await axios.put(`${baseURL}/store-users/forget-password`, data);
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
    FailureAlert(error?.response?.data?.error?.message);
  }
  return false;
};

export const resetPassword = async ({ token, data, email }) => {
  try {
    let res = await axios.put(
      `${baseURL}/store-users/reset-password?password_reset_token=${token}&email=${email}`,
      { password: data }
    );

    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
    FailureAlert("Somthing went wrong");
    false;
  }
};

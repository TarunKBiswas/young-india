import { FailureAlert } from "../../components/Toast";
import { axios } from "./Axios";
import { baseURL } from "./Constant";

export const globalSettings = async () => {
  try {
    let res = await axios.get(`${baseURL}/store-globals`);
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const login = async (data) => {
  try {
    let res = await axios.post(`${baseURL}/store-users/send-otp`, {
      phone: data,
    });
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
    FailureAlert(error?.response?.data?.message);
  }
  return false;
};

export const requestUserInfo = async (data) => {
  try {
    let res = await axios.post(`${baseURL}/store-users/verify-otp`, data);
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
    FailureAlert(error?.response?.data?.error?.message);
  }
  return false;
};

export const registerInfo = async (data) => {
  try {
    let res = await axios.post(`${baseURL}/store-users`, data);
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    return error;
  }
  return false;
};

export const varifyOTp = async (data) => {
  try {
    let res = await axios.post(`${baseURL}/store-users/verify-otp`, data);
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    return error;
  }
  return false;
};

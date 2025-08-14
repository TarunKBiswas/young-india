// import { axios } from "./Store/Axios";
import axios from "axios";
import { baseURL, getHeader } from "./const_API";

export const getAddressList = async () => {
  try {
    let res = await axios.get(
      `${baseURL}/addresses?populate[0]=user`,
      getHeader()
    );
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const deleteAddress = async (id) => {
  try {
    let res = await axios.delete(`${baseURL}/addresses/${id}`, getHeader());
    if (res?.status === 200) {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const postAddress = async (data) => {
  try {
    let res = await axios.post(
      `${baseURL}/custom/addAddress`,
      data,
      getHeader()
    );
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const updateAddress = async (id, data) => {
  try {
    let res = await axios.patch(
      `${baseURL}/custom/address/${id}`,
      data,
      getHeader()
    );
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const getSingleAddress = async (id) => {
  try {
    let res = await axios.get(`${baseURL}/addresses/${id}`, getHeader());
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const getSingleUserAddress = async (id) => {
  try {
    let res = await axios.get(
      `${baseURL}/users/${id}?populate[0]=addresses`,
      getHeader()
    );
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

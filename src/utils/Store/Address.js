// import { axios } from "./Axios";
import axios from "axios";
import { baseURL, getStoreHeader } from "./Constant";

export const getAddress = async () => {
  try {
    let res = await axios.get(`${baseURL}/address`, getStoreHeader());
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const creatAddress = async (data) => {
  try {
    let res = await axios.post(`${baseURL}/address`, data, getStoreHeader());
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
    let res = await axios.delete(`${baseURL}/address/${id}`, getStoreHeader());
    if (res?.status === 200) {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const fetchAreaData = async (pincode) => {
  try {
    let res = await axios.get(
      `https://api.postalpincode.in/pincode/${pincode}`
    );
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
      getStoreHeader()
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
    let res = await axios.put(
      `${baseURL}/address/${id}`,
      data,
      getStoreHeader()
    );
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const getAddressSingle = async (id) => {
  try {
    let res = await axios.get(`${baseURL}/address/${id}`, getStoreHeader());
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

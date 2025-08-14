/* eslint-disable no-constant-condition */
// import { axios } from "./Store/Axios";
import axios from "axios";
import { baseURL, getHeader } from "./const_API";

export const getCoupons = async () => {
  try {
    let res = await axios.get(`${baseURL}/coupons?populate=*`, getHeader());
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteCoupons = async (id) => {
  try {
    let res = await axios.delete(`${baseURL}/coupons/${id}`, getHeader());
    if (res?.status === 200) {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
};

export const createCoupon = async (data) => {
  try {
    let res = await axios.post(`${baseURL}/coupons`, data, getHeader());
    if (res?.status === 200 || 201) {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const updateCouponStatus = async (id, data) => {
  try {
    let res = await axios.put(`${baseURL}/coupons/${id}`, data, getHeader());
    if (res?.status === 200) {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

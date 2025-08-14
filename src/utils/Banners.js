// import { axios } from "./Store/Axios";
import axios from "axios";
import { baseURL, getHeader } from "./const_API";

export const getBannersList = async () => {
  try {
    let res = await axios.get(`${baseURL}/store-banners`, getHeader());
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const deleteBanner = async (id) => {
  try {
    let res = await axios.delete(`${baseURL}/store-banners/${id}`, getHeader());
    if (res?.status === 200) {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const createBanner = async (data) => {
  try {
    let res = await axios.post(`${baseURL}/store-banners`, data, getHeader());
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const getSingleBanner = async (id) => {
  try {
    let res = await axios.get(
      `${baseURL}/store-banners/${id}?populate=image`,
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

export const updateBanner = async (id, data) => {
  try {
    let res = await axios.put(
      `${baseURL}/store-banners/${id}`,
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

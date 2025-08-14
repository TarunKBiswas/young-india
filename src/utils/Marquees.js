// import { axios } from "./Store/Axios";
import axios from "axios";
import { baseURL, getHeader } from "./const_API";

export const getMarqueeData = async () => {
  try {
    let res = await axios.get(`${baseURL}/marquees`, getHeader());
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const createMarquee = async (data) => {
  try {
    let res = await axios.post(`${baseURL}/marquees`, data, getHeader());
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const deleteMarquee = async (id) => {
  try {
    let res = await axios.delete(`${baseURL}/marquees/${id}`, getHeader());
    if (res?.status === 200) {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
};

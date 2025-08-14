import { axios } from "./Store/Axios";
import { baseURL, getHeader } from "./const_API";

export const getStories = async () => {
  try {
    let res = await axios.get(`${baseURL}/stories`, getHeader());
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const deleteStory = async (id) => {
  try {
    let res = await axios.delete(`${baseURL}/stories/${id}`, getHeader());
    if (res?.status === 200) {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const createStory = async (data) => {
  try {
    let res = await axios.post(`${baseURL}/stories`, data, getHeader());
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const getSingleStory = async (id) => {
  try {
    let res = await axios.get(`${baseURL}/stories/${id}`, getHeader());
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const updateStory = async (id, data) => {
  try {
    let res = await axios.put(`${baseURL}/stories/${id}`, data, getHeader());
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

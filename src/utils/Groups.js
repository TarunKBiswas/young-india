import { axios } from "./Store/Axios";
import { baseURL, getHeader } from "./const_API";

export const getGroups = async () => {
  try {
    let res = await axios.get(`${baseURL}/groups`, getHeader());
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const createGroup = async (data) => {
  try {
    let res = await axios.post(`${baseURL}/groups`, data, getHeader());

    if (res?.status === 201) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const deleteGroup = async (id) => {
  try {
    let res = await axios.delete(`${baseURL}/groups/${id}`, getHeader());
    if (res?.status === 200) {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

import { axios } from "./Store/Axios";
import { baseURL, getHeader } from "./const_API";

export const getWallet = async (page, size) => {
  try {
    let res = await axios.get(
      `${baseURL}/wallets?pagination[page]=${page}&pagination[pageSize]=${size}`,
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

export const postWallet = async (data) => {
  try {
    let res = await axios.post(`${baseURL}/wallets`, data, getHeader());
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const deleteWallet = async (id) => {
  try {
    let res = await axios.delete(`${baseURL}/wallets/${id}`, getHeader());
    if (res?.status === 200) {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

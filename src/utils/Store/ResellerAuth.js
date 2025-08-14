/* eslint-disable no-unused-vars */
import { axios } from "./Axios";
import { baseURL } from "./Constant";
import { webState } from "../../data/webStates";

// reseller LOGIN
export const resellerlogin = async (number) => {
  try {
    let res = await axios.post(`${baseURL}/auth/local`, {
      number,
    });
    if (res?.status === 200) {
      const resellerToken = sessionStorage.setItem(
        "resellerToken",
        res?.data?.jwt
      );
      return true;
    }
  } catch (error) {
    console.log(error);
  }

  return false;
};

export const getSellerBrand = async () => {
  try {
    let res = await axios.get(`${baseURL}/global-brand?populate=*`);
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

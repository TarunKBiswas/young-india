// import { axios } from "./Store/Axios";
import { baseURL, getHeader } from "./const_API";
import { FailureAlert } from "../components/Toast";
import axios from "axios";

//  PRICING SETTINGS
export const getGlobadData = async () => {
  try {
    let res = await axios.get(`${baseURL}/store-globals`, getHeader());
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const updateGlobalData = async (data) => {
  try {
    let res = await axios.post(`${baseURL}/store-globals`, data, getHeader());
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
    FailureAlert("Somthing Went Wrong");
  }
  return false;
};

export const integrateShipRocket = async (data) => {
  try {
    let res = await axios.post(
      `${baseURL}/store-globals/shiprocket`,
      data,
      getHeader()
    );
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
    FailureAlert("Somthing Went Wrong");
  }
  return false;
};

// export const createGlobalSetting = async (data) => {
//   try {
//     let res = await axios.post(`${baseURL}/custom/settings`, data, getHeader());
//     if (res?.status === 200) {
//       return res;
//     }
//   } catch (error) {
//     console.log(error);
//   }
//   return false;
// };
//  PRICING SETTINGS END

// GLOBAL BRAND SETTINGS
export const getGlobalBrand = async () => {
  try {
    let res = await axios.get(`${baseURL}/store-global-brands`);
    //
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const updateGlobalBrand = async (data) => {
  console.log(data);
  try {
    let res = await axios.post(
      `${baseURL}/store-global-brands`,
      data,
      getHeader()
    );
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
  return false;
};

export const getStoreData = async () => {
  try {
    let res = await axios.get(`${baseURL}/store-settings`, getHeader());
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const updatedStoreData = async (data) => {
  try {
    let res = await axios.post(`${baseURL}/store-settings`, data, getHeader());
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const getStoreFooterData = async () => {
  try {
    let res = await axios.get(`${baseURL}/store-policy`, getHeader());
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const updateStoreFooterData = async (data) => {
  try {
    let res = await axios.post(`${baseURL}/store-policy`, data, getHeader());
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
    FailureAlert("Please Fill all the fields ");
  }
  return false;
};

export const deleteAllData = async () => {
  try {
    let res = await axios.delete(`${baseURL}/orders/delete-all`, getHeader());
    if (res?.status === 200) {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const buySmsApi = async (data) => {
  try {
    let res = await axios.post(
      `${baseURL}/store-globals/buy-msg`,
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

export const buySmsVerifyApi = async (data) => {
  try {
    let res = await axios.post(
      `${baseURL}/store-globals/verify-msg`,
      data,
      getHeader()
    );
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
    FailureAlert("Please Fill all the fields ");
  }
  return false;
};

// STORE SETTINGS END

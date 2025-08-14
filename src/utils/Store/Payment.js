import { FailureAlert } from "../../components/Toast";
import { axios } from "./Axios";
import { baseURL, getStoreHeader } from "./Constant";

export const checkout = async (data) => {
  try {
    let res = await axios.post(
      `${baseURL}/orders/checkout/razorpay`,
      data,
      getStoreHeader()
    );
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
    FailureAlert(error?.response?.data?.error?.message);
    return error;
  }
  return false;
};

export const wallet = async (data) => {
  try {
    let res = await axios.post(
      `${baseURL}/orders/checkout/wallet`,
      data,
      getStoreHeader()
    );
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
    FailureAlert(error?.response?.data?.error?.message);
    return error;
  }
  return false;
};

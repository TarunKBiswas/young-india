import { axios } from "./Axios";
import { baseURL, getStoreHeader } from "./Constant";

export const userInfoData = async () => {
  try {
    let res = await axios.get(`${baseURL}/store-users/me`, getStoreHeader());
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
  return false;
};

export const walletWithdraw = async (data) => {
  try {
    let res = await axios.post(
      `${baseURL}/wallets/withdraw`,
      data,
      getStoreHeader()
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

export const editProfile = async (id, data) => {
  try {
    let res = await axios.put(
      `${baseURL}/store-users/${id}`,
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

export const premiumPlansData = async () => {
  try {
    let res = await axios.get(`${baseURL}/store-plans`, getStoreHeader());
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const getSubscription = async (data) => {
  try {
    let res = await axios.post(
      `${baseURL}/store-subscriptions/checkout`,
      data,
      getStoreHeader()
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

export const getStoreUserOrders = async (status, mode, page, size) => {
  let checkStatus = status ? `status=${status}` : "";
  let checkMode = mode ? `payment_mode=${mode}` : "";
  try {
    let res = await axios.get(
      `${baseURL}/order-variants/store-users?${checkStatus}&${checkMode}&pagination[page]=${page}&pagination[pageSize]=${size}`,
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

export const cancelOrder = async (id) => {
  try {
    let res = await axios.put(
      `${baseURL}/order-variants/${id}/cancel`,
      getStoreHeader()
    );
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.error(error);
  }
  return false;
};

export const getOrderById = async (id) => {
  try {
    let res = await axios.get(
      `${baseURL}/order-variants/${id}/users`,
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

export const returnOrder = async (id, data) => {
  try {
    let res = await axios.put(
      `${baseURL}/order-variants/${id}/return-request`,
      data,
      getStoreHeader()
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

export const getReturnProduct = async () => {
  try {
    let res = await axios.get(
      `${baseURL}/order-variants/return-requests`,
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

export const getStoreData = async () => {
  try {
    let res = await axios.get(`${baseURL}/store-settings`);
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

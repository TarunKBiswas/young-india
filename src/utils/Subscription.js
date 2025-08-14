import { axios } from "./Store/Axios";
import { baseURL, getHeader } from "./const_API";

export const getSubscribersList = async () => {
  try {
    let res = await axios.get(`${baseURL}/store-subscriptions`, getHeader());
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const deleteSubscriber = async (id) => {
  try {
    let res = await axios.delete(`${baseURL}/subscriptions/${id}`, getHeader());
    if (res?.status === 200) {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const createSubscriber = async (data) => {
  try {
    let res = await axios.post(
      `${baseURL}/store-subscriptions`,
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

export const getSingleDetails = async (id) => {
  try {
    let res = await axios.get(
      `${baseURL}/subscriptions/${id}?populate[0]=users_permissions_user&populate[1]=plan`,
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

export const updateSubscriber = async (id, data) => {
  try {
    let res = await axios.put(
      `${baseURL}/subscriptions/${id}`,
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

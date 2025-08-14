import { axios } from "./Store/Axios";
import { baseURL, getHeader } from "./const_API";

export const getPromotionalMessages = async () => {
  try {
    let res = await axios.get(`${baseURL}/promotional-messages`);
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const createPromotionalMessage = async (data) => {
  try {
    let res = await axios.post(
      `${baseURL}/promotional-messages`,
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

export const getPromotionalMessageById = async (id) => {
  try {
    let res = await axios.get(
      `${baseURL}/promotional-messages/${id}`,
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

export const deletePromotionalMessage = async (id) => {
  try {
    let res = await axios.delete(
      `${baseURL}/promotional-messages/${id}`,
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

export const updatePromotionalMessage = async (id, data) => {
  try {
    let res = await axios.put(
      `${baseURL}/promotional-messages/${id}`,
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

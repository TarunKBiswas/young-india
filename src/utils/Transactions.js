import { baseURL, getHeader } from "./const_API";
import { axios } from "./Store/Axios";

export const getTransacationList = async (page, size, purpose, type, mode) => {
  try {
    let res = await axios.get(
      `${baseURL}/store-transactions?pagination[pageSize]=${size}&pagination[page]=${page}&purpose=${purpose}&mode=${mode}&txn_type=${type}`,
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

export const deleteTransacation = async (id) => {
  try {
    let res = await axios.delete(`${baseURL}/transactions/${id}`, getHeader());
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const createTransacation = async (data) => {
  try {
    let res = await axios.post(
      `${baseURL}/transactions`,
      { data: data },
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

export const updateTransacationList = async (id, data) => {
  try {
    let res = await axios.post(
      `${baseURL}/transactions/${id}`,
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

export const getTransacationByID = async (id) => {
  try {
    let res = await axios.get(`${baseURL}/transactions/${id}`, getHeader());
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const getTransacationByUser = async (id) => {
  try {
    let res = await axios.get(
      `${baseURL}/users/${id}/transactions`,
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

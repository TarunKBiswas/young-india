/* eslint-disable no-constant-condition */
import { baseURL } from "../const_API";
import { axios } from "./Axios";
import { getStoreHeader } from "./Constant";

export const getHandler = async (url) => {
  try {
    const res = await axios.get(`${baseURL}/${url}`);
    if (res?.status === 200 || 201 || true) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const getHandlerWithToken = async (url) => {
  try {
    const res = await axios.get(`${baseURL}/${url}`, getStoreHeader());
    if (res?.status === 200 || 201 || true) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const postHandler = async (url, body) => {
  try {
    const res = await axios.post(`${baseURL}/${url}`, body);
    if (res?.status === 200 || 201 || true) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const postHandlerWithToken = async (url, body) => {
  try {
    const res = await axios.post(`${baseURL}/${url}`, body, getStoreHeader());
    if (res?.status === 200 || 201 || true) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const deletHandler = async (url, id) => {
  try {
    const res = await axios.delete(`${baseURL}/${url}/${id}`);
    if (res?.status === 200 || 201 || true) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const deleteHandlerWithToken = async (url, id) => {
  try {
    const res = await axios.delete(`${baseURL}/${url}/${id}`, getStoreHeader());
    if (res?.status === 200 || 201 || true) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const putHandlerWithToken = async (url, body) => {
  try {
    const res = await axios.put(`${baseURL}/${url}`, body, getStoreHeader());
    if (res?.status === 200 || 201 || true) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const cleanCartList = async () => {
  try {
    const res = await axios.delete(`${baseURL}/cart/empty`, getStoreHeader());
    if (res?.status === 200 || 201 || true) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

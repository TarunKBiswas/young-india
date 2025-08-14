// import { axios } from "./Store/Axios";
import axios from "axios";
import { baseURL, getHeader } from "./const_API";

// GET COLLECTION LIST
export const getCollectionListing = async () => {
  try {
    const res = await axios.get(`${baseURL}/collections`, getHeader());
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

//  GET COLLECTION DETAILS
export const getCollectionDetail = async (id) => {
  try {
    const res = await axios.get(`${baseURL}/collections/${id}`, getHeader());
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

// DELETE COLLECTION
export const deleteCollection = async (id) => {
  try {
    const res = await axios.delete(`${baseURL}/collections/${id}`, getHeader());
    if (res?.status === 200) {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
};

// CREATE COLLECTION
export const createCollection = async (data) => {
  try {
    const res = await axios.post(`${baseURL}/collections`, data, getHeader());
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

//  EDIT COLLECTION DETAILS
export const editCollection = async (id, data) => {
  try {
    const res = await axios.put(
      `${baseURL}/collections/${id}`,
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

export const getCollections = async () => {
  try {
    let res = await axios.get(`${baseURL}/collections`, getHeader());
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const searchCollections = async (query) => {
  try {
    let res = await axios.get(
      `${baseURL}/search/collections?qs=${query}`,
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

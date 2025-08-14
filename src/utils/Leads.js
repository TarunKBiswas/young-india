// import { axios } from "./Store/Axios";
import axios from "axios";
import { baseURL, getHeader } from "./const_API";

export const getLeadsList = async (page, size, status, source, type) => {
  let checkStatus = status ? `status=${status}` : "";
  let checkSource = source ? `source=${source}` : "";
  let checktype = type ? `type=${type}` : "";

  try {
    let res = await axios.get(
      `${baseURL}/store-leads?pagination[page]=${page}&pagination[size]=${size}&${checkStatus}&${checkSource}&${checktype}`,
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

export const getLeadStats = async () => {
  try {
    let res = await axios.get(`${baseURL}/store-leads/stats`, getHeader());
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const getSingleLead = async (id) => {
  try {
    let res = await axios.get(`${baseURL}/store-leads/${id}`, getHeader());
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const createLead = async (data) => {
  try {
    let res = await axios.post(`${baseURL}/store-leads`, data, getHeader());
    if (res?.status === 201) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const updateLeadStatus = async (id, data) => {
  try {
    let res = await axios.put(
      `${baseURL}/store-leads/${id}`,
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

export const deleteLeads = async (id) => {
  try {
    let res = await axios.delete(`${baseURL}/store-leads/${id}`, getHeader());
    if (res?.status === 200) {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const searchLead = async (query) => {
  try {
    let res = await axios.get(
      `${baseURL}/leads/search?qs=${query}`,
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

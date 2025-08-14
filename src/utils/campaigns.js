import { axios } from "./Store/Axios";
import { baseURL, getHeader } from "./const_API";

export const getCampaignList = async (page, size) => {
  try {
    let res = await axios.get(
      `${baseURL}/campaigns?pagination[page]=${page}&pagination[pageSize]=${size}`,
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

export const createCampaign = async (data) => {
  try {
    let res = await axios.post(`${baseURL}/campaigns`, data, getHeader());
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const getSingleCampaign = async (id) => {
  try {
    let res = await axios.get(`${baseURL}/campaigns/${id}`, getHeader());
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const deleteCampaign = async (id) => {
  try {
    let res = await axios.delete(`${baseURL}/campaigns/${id}`, getHeader());
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const updateCampaign = async (id, data) => {
  try {
    let res = await axios.put(`${baseURL}/campaigns/${id}`, data, getHeader());
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

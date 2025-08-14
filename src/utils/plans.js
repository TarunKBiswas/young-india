import { axios } from "./Store/Axios";
import { baseURL, getHeader } from "./const_API";

// CREATE PLAN
export const createPlan = async (data) => {
  try {
    let res = await axios.post(`${baseURL}/store-plans`, data, getHeader());
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

// GET ALL PLANS
export const getAllPlans = async () => {
  try {
    let res = await axios.get(`${baseURL}/store-plans`, getHeader());
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

// GET SINGLE PLANS
export const getSinglePlan = async (id) => {
  try {
    let res = await axios.get(`${baseURL}/store-plans/${id}`, getHeader());
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

// DELETE PLANS
export const deletePlans = async (id) => {
  try {
    let res = await axios.delete(`${baseURL}/store-plans/${id}`, getHeader());
    if (res?.status === 200) {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const getFreePlans = async () => {
  try {
    let res = await axios.get(`${baseURL}/store-free-plans`, getHeader());
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const updateFreePlan = async (data) => {
  try {
    let res = await axios.post(
      `${baseURL}/store-free-plans`,
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

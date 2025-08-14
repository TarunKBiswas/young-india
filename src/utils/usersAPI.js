import { baseURL, getHeader } from "./const_API";
import { FailureAlert } from "../components/Toast";
import axios from "axios";

// USERS LISTING
export const usersListing = async (page, size) => {
  try {
    const res = await axios.get(
      `${baseURL}/store-users?pagination[page]=${page}&pagination[pageSize]=${size}&role=Consumer`,
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

// CREATE USER
export const createUser = async (data) => {
  try {
    const res = await axios.post(`${baseURL}/store-users`, data, getHeader());
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
    FailureAlert(error?.response?.data?.error?.message);
  }
  return false;
};

export const createStaff = async (data) => {
  try {
    const res = await axios.post(
      `${baseURL}/store-users/staff/register`,
      data,
      getHeader()
    );
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
    FailureAlert(error?.response?.data?.message);
  }
  return false;
};

// GET USER LIST
export const getUsers = async () => {
  try {
    const res = await axios.get(`${baseURL}/store-users`, getHeader());
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

// USER ROLES
export const getUserPermissions = async () => {
  try {
    const res = await axios.get(
      `${baseURL}/users-permissions/roles`,
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

// DELETE USER
export const deleteUser = async (id) => {
  try {
    const res = await axios.delete(`${baseURL}/store-users/${id}`, getHeader());
    if (res?.status === 200) {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

// GET SINGLE USER
export const getSingleUserDetails = async (id) => {
  try {
    const res = await axios.get(`${baseURL}/store-users/${id}`, getHeader());
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

// EDIT USER DETAILS
export const editUser = async (id, data) => {
  try {
    const res = await axios.put(
      `${baseURL}/store-users/${id}`,
      data,
      getHeader()
    );
    if (res?.status === 200) {
      return true;
    }
  } catch (error) {
    console.log(error);
    FailureAlert("Somthing Went Wrong");
  }
  return false;
};

// SEARCH USER DETAILS
export const searchUser = async (qs) => {
  try {
    const res = await axios.get(
      `${baseURL}/store-users/search?qs=${qs}`,
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

export const getStaffList = async (page, size) => {
  try {
    const res = await axios.get(
      `${baseURL}/store-users/staff/listing?pagination[page]=${page}&pagination[pageSize]=${size}`,
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

export const getUserDetails = async (id, tag) => {
  try {
    const res = await axios.get(
      `${baseURL}/store-users/${id}/full-detail?type=${tag}`,
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

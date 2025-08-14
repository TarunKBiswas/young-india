// import { axios } from "./Store/Axios";
import { baseURL, getHeader } from "./const_API";
import { FailureAlert } from "../components/Toast";
import axios from "axios";

export const getCategoryListing = async (page, count) => {
  try {
    const res = await axios.get(
      `${baseURL}/categories?pagination[page]=${page}&pagination[pageSize]=${count}`,
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

export const getCategoryProduct = async (id) => {
  try {
    let res = await axios.get(
      `${baseURL}/categories/${id}?populate[0]=products.product_variants&populate[1]=products.thumbnail`,
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

export const getCategories = async () => {
  try {
    const res = await axios.get(`${baseURL}/categories`, getHeader());
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const getSubCategoryProducts = async (id) => {
  try {
    const res = await axios.get(
      `${baseURL}/sub-categories/${id}/products`,
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

export const getSubCategoryListing = async (id) => {
  try {
    const res = await axios.get(`${baseURL}/categories/${id}`, getHeader());
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const getSingleCatDetails = async (id) => {
  try {
    const res = await axios.get(
      `${baseURL}/categories/${id}/products`,
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

export const deleteCategory = async (id) => {
  try {
    const res = await axios.delete(`${baseURL}/categories/${id}`, getHeader());
    if (res?.status === 200) {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const getAllSubCategories = async () => {
  try {
    const res = await axios.get(`${baseURL}/sub-categories`, getHeader());
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const getSubCategoriesListing = async () => {
  try {
    const res = await axios.get(`${baseURL}/sub-categories/all`, getHeader());
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const postCategory = async (data) => {
  try {
    const res = await axios.post(`${baseURL}/categories`, data, getHeader());
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
    let word =
      error?.response?.data?.error?.details?.errors[0]?.message?.split(" ");
    word[0] = "Name";
    const updatedValue = word.join(" ");
    FailureAlert(updatedValue);
  }
  return false;
};

export const postSubCategory = async (data) => {
  try {
    const res = await axios.post(
      `${baseURL}/sub-categories`,
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

export const deleteSubCat = async (id) => {
  try {
    const res = await axios.delete(
      `${baseURL}/sub-categories/${id}`,
      getHeader()
    );
    if (res?.status === 200) {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const getSubCat = async (id) => {
  try {
    const res = await axios.get(
      `${baseURL}/sub-categories/${id}?populate[0]=thumbnail`,
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

export const updateCategory = async (id, data) => {
  try {
    let res = await axios.put(`${baseURL}/categories/${id}`, data, getHeader());
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const updateSubCategory = async (id, data) => {
  try {
    let res = await axios.put(
      `${baseURL}/sub-categories/${id}`,
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

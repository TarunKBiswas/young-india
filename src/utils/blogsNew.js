import axios from "axios";
import { baseURL, getHeader } from "./const_API";

export const getBlogs = async () => {
  try {
    let res = await axios.get(`${baseURL}/blogs`);
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getSingleBlog = async (id) => {
  try {
    let res = await axios.get(`${baseURL}/blogs/${id}`);
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
};

export const createBlog = async (body) => {
  try {
    let res = await axios.post(`${baseURL}/blogs`, body, getHeader());
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteBlog = async (id) => {
  try {
    let res = await axios.delete(`${baseURL}/blogs/${id}`, getHeader());
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateBlog = async (id, body) => {
  try {
    let res = await axios.put(`${baseURL}/blogs/${id}`, body, getHeader());
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
};

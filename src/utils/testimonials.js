import { axios } from "./Store/Axios";
import { baseURL, getHeader } from "./const_API";

export const getTestimonials = async () => {
  try {
    let res = await axios.get(`${baseURL}/testimonials`, getHeader());
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const createTestimonials = async (data) => {
  try {
    let res = await axios.post(`${baseURL}/testimonials`, data, getHeader());
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const deleteTestimonial = async (id) => {
  try {
    let res = await axios.delete(`${baseURL}/testimonials/${id}`, getHeader());
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

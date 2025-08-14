// import { axios } from "./Store/Axios";
import axios from "axios";
import { baseURL, getHeader } from "./const_API";

export const getReviews = async (page, size) => {
  try {
    let res = await axios.get(
      `${baseURL}/products/reviews-list?pagination[pageSize]=${size}&pagination[page]=${page}`,
      getHeader()
    );
    if (res.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const deleteReview = async (id) => {
  try {
    let res = await axios.delete(
      `${baseURL}/product-reviews/${id}`,
      getHeader()
    );
    if (res.status === 200) {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const reviewDetails = async (id) => {
  try {
    let res = await axios.get(
      `${baseURL}/product-reviews/products/${id}`,
      getHeader()
    );
    if (res.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

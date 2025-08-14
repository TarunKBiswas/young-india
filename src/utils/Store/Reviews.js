import { axios } from "./Axios";
import { baseURL, getStoreHeader } from "./Constant";

export const getReviewList = async (id) => {
  try {
    let res = await axios.get(`${baseURL}/product-reviews/products/${id}`);
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const createUserReview = async (data) => {
  try {
    let res = await axios.post(
      `${baseURL}/product-reviews`,
      data,
      getStoreHeader()
    );
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

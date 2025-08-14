import { axios } from "./Axios";
import { baseURL } from "./Constant";

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

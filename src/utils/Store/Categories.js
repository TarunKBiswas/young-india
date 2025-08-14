import axios from "axios";
import { baseURL } from "./Constant";

export const getSubCategories = async (id) => {
  try {
    let res = await axios.get(`${baseURL}/custom/categories/${id}`);
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

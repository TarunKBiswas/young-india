import { axios } from "./Axios";
import { baseURL, getStoreHeader } from "./Constant";

export const getTransacations = async (page, size) => {
  try {
    let res = await axios.get(
      `${baseURL}/store-transactions/store-users?pagination[page]=${page}&pagination[pageSize]=${size}`,
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

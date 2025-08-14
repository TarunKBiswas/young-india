import { axios } from "./Store/Axios";
import { baseURL, getHeader } from "./const_API";

export const getStatsData = async (days) => {
  try {
    let res = await axios.get(
      `${baseURL}/store-users/dashboard?days=${days}`,
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

export const getRecentOrder = async () => {
  try {
    let res = await axios.get(`${baseURL}/orders?status=NEW`, getHeader());
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const getRecentlyAddedProducts = async () => {
  try {
    let res = await axios.get(`${baseURL}/products/recent`, getHeader());
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

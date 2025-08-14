import { axios } from "./Store/Axios";
import { baseURL, getHeader } from "./const_API";

export const getActivity = async (page, size) => {
  try {
    let res = await axios.get(
      `${baseURL}/store-activity-logs?pagination[page]=${page}&pagination[pageSize]=${size}`,
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

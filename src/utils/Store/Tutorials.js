import { axios } from "./Axios";
import { baseURL } from "./Constant";

export const getTutorials = async () => {
  try {
    let res = await axios.get(`${baseURL}/tutorial`);
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

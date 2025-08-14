import { axios } from "./Store/Axios";
import { baseURL } from "./const_API";

export const getStaffList = async () => {
  try {
    let res = await axios.get(`${baseURL}/users?role=staff,admin`);
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

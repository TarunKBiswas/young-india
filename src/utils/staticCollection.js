import { axios } from "./Store/Axios";
import { baseURL, getHeader } from "./const_API";

export const getStaticCollection = async () => {
  try {
    let res = await axios.get(
      `${baseURL}/collection-statics?populate[0]=products.thumbnail`,
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

export const getSingleStaticCollection = async (id) => {
  try {
    let res = await axios.get(
      `${baseURL}/collection-statics/${id}`,
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

export const updateStaticCollection = async (id, data) => {
  try {
    let res = await axios.put(
      `${baseURL}/collection-statics/${id}`,
      { data: data },
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

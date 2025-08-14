import { axios } from "./Store/Axios";
import { baseURL, getHeader } from "./const_API";

export const getTutorials = async () => {
  try {
    let res = await axios.get(
      `${baseURL}/tutorials?populate[0]=thumbnail`,
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

export const createTutorials = async (data) => {
  try {
    let res = await axios.post(
      `${baseURL}/tutorials`,
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

export const getSingleTutorials = async (id) => {
  try {
    let res = await axios.get(
      `${baseURL}/tutorials/${id}?populate=*`,
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

export const deleteTutorials = async (id) => {
  try {
    let res = await axios.delete(`${baseURL}/tutorials/${id}`, getHeader());
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const updateTutorials = async (id, data) => {
  try {
    let res = await axios.put(
      `${baseURL}/tutorials/${id}`,
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

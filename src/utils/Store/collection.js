import { axios } from "./Axios";
import { baseURL } from "./Constant";

export const getCollection = async () => {
  try {
    let res = await axios.get(`${baseURL}/collections`);
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const getCollectionProduct = async (id) => {
  try {
    let res = await axios.get(`${baseURL}/collections/${id}/products`);
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const getFilterCollection = async ({
  id,
  sortBy,
  sortThrough,
  priceMin,
  priceMax,
}) => {
  let sort = `orderBy[${sortBy}]=${sortThrough}`;
  let maxPrice = `price[max]=${priceMax}`;
  let minPrice = `price[min]=${priceMin}`;
  try {
    let res = await axios.get(
      `${baseURL}/collections/${id}/products?${sortBy && sort}&${
        priceMin && minPrice
      }&${priceMax && maxPrice}`
    );
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

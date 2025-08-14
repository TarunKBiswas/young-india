import { axios } from "./Axios";
import { baseURL } from "./Constant";

export const getCategories = async () => {
  try {
    let res = await axios.get(`${baseURL}/categories`);
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const getCategoryProduct = async ({ id, page, size }) => {
  try {
    let res = await axios.get(`${baseURL}/categories/${id}/products?pagination[page]=${page}&pagination[pageSize]=${size}`);
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getCategoryFilter = async ({
  id,
  page,
  size,
  orderBy,
  sortThrough,
  priceMin,
  priceMax,
}) => {
  let sort = `orderBy[${orderBy}]=${sortThrough}`;
  let maxPrice = `price[max]=${priceMax}`;
  let minPrice = `price[min]=${priceMin}`;
  try {
    let res = await axios.get(
      `${baseURL}/categories/${id}/products?&pagination[page]=${page}&pagination[pageSize]=${size}&${
        orderBy && sort
      }&${priceMin && minPrice}& ${priceMax && maxPrice}`
    );

    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const getBanners = async () => {
  try {
    let res = await axios.get(`${baseURL}/store-banners`);
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const getProducts = async () => {
  try {
    let res = await axios.get(`${baseURL}/products`);
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const getPopularProducts = async (page, size) => {
  try {
    let res = await axios.get(
      `${baseURL}/products?pagination[page]=${page}&pagination[pageSize]=${size}`
    );
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const getTrendingProducts = async () => {
  try {
    let res = await axios.get(`${baseURL}/products/8/trending`);
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const getTopSellingingProducts = async () => {
  try {
    let res = await axios.get(`${baseURL}/products/8/selling`);
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const getProductAll = async (
  sortBy,
  sortThrough,
  priceMin,
  priceMax,
  page,
  size
) => {
  let sort = `orderBy[${sortBy}]=${sortThrough}`;
  let maxPrice = `price[max]=${priceMax}`;
  let minPrice = `price[min]=${priceMin}`;
  try {
    let res = await axios.get(
      `${baseURL}/products?pagination[page]=${page}&pagination[pageSize]=${size}${
        sortBy && sort
      }&${priceMin && minPrice}&${priceMax && maxPrice}`
    );
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const getBrandDetail = async () => {
  try {
    let res = await axios.get(`${baseURL}/store-global-brands`);
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const getPromotionalMessages = async () => {
  try {
    let res = await axios.get(`${baseURL}/promotional-messages`);
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const getTestimonialData = async () => {
  try {
    let res = await axios.get(`${baseURL}/testimonials`);
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const getStories = async () => {
  try {
    let res = await axios.get(`${baseURL}/stories`);
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
};

export const singleStory = async (id) => {
  try {
    let res = await axios.get(`${baseURL}/stories/${id}`);
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
};

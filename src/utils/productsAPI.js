// import { axios } from "./Store/Axios";
import axios from "axios";
import { baseURL, getHeader } from "./const_API";

export const getAllProductsList = async (page, size, tag) => {
  try {
    const res = await axios.get(
      `${baseURL}/products?pagination[pageSize]=${size}&pagination[page]=${page}&status=${tag}`,
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

export const listAllProducts = async () => {
  try {
    let res = await axios.get(`${baseURL}/products/simple-data`, getHeader());
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const getAllProducts = async () => {
  try {
    let res = await axios.get(`${baseURL}/products`, getHeader());
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const deleteProduct = async (id) => {
  try {
    const res = await axios.delete(`${baseURL}/products/${id}`, getHeader());
    if (res?.status === 200) {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const createProduct = async (data) => {
  try {
    const res = await axios.post(`${baseURL}/products`, data, getHeader());
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const getProductVariants = async () => {
  try {
    const res = await axios.get(`${baseURL}/product-variants`, getHeader());
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const addProductVariant = async (data) => {
  try {
    const res = await axios.post(
      `${baseURL}/product-variants`,
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

export const getSingleProductDetail = async (id) => {
  try {
    const res = await axios.get(`${baseURL}/products/${id}`, getHeader());
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const getSingleProductVariant = async (id) => {
  try {
    const res = await axios.get(
      `${baseURL}/products/${id}?populate=product_variants`,
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

export const postBulkPricing = async (data) => {
  try {
    let res = await axios.post(`${baseURL}/bulk-pricings`, data, getHeader());
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const getProductDetailPublic = async (id) => {
  try {
    let res = await axios.get(`${baseURL}/products/rs/${id}`);
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const getSearchProduct = async (qs) => {
  try {
    let res = await axios.get(
      `${baseURL}/search/products?qs=${qs}`,
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

export const deteleBulkPrice = async (id) => {
  try {
    let res = await axios.delete(`${baseURL}/bulk-pricings/${id}`, getHeader());
    if (res?.status === 200) {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const updateBulkPricing = async (id, data) => {
  try {
    let res = await axios.put(
      `${baseURL}/bulk-pricings/${id}`,
      data,
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

export const updateVariant = async (id, data) => {
  try {
    let res = await axios.put(`${baseURL}/variants/${id}`, data, getHeader());
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const updateProduct = async (id, data) => {
  try {
    let res = await axios.put(`${baseURL}/products/${id}`, data, getHeader());
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const createVariant = async (data) => {
  try {
    let res = await axios.post(`${baseURL}/variants`, data, getHeader());
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const createBulkPrice = async (data) => {
  try {
    let res = await axios.post(`${baseURL}/bulk-pricings`, data, getHeader());
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const exportProduct = async (data) => {
  try {
    let res = await axios.post(`${baseURL}/products/export`, data, {
      ...getHeader(),
      responseType: "blob",
    });
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const createReview = async (data) => {
  try {
    let res = await axios.post(`${baseURL}/product-reviews`, data, getHeader());
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const deleteReview = async (id) => {
  try {
    let res = await axios.delete(
      `${baseURL}/product-reviews/${id}`,
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

export const updateProductStatus = async (id, data) => {
  try {
    let res = await axios.put(`${baseURL}/products/${id}`, data, getHeader());
    if (res?.status === 200) {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const productStats = async () => {
  try {
    let res = await axios.get(`${baseURL}/products/stats`, getHeader());
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

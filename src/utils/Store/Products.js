import { axios } from "./Axios";
import { baseURL, getStoreHeader } from "./Constant";

export const getProductDetail = async (id) => {
  try {
    const res = await axios.get(`${baseURL}/products/${id}`);
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const productPolicy = async () => {
  try {
    let res = await axios.get(`${baseURL}/product-policies`);
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getSearch = async (query, page, pageSize) => {
  try {
    let res = await axios.get(
      `${baseURL}/search/products?pagination[page]=${page}&pagination[pageSize]=${pageSize}&qs=${query}`
    );
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const pincodeSeach = async (pincode) => {
  try {
    let res = await axios.get(
      `${baseURL}/pin-codes?filters[pincode][$eqi]=${pincode}`
    );
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

// export const getFilterProduct = async ({
//   category,
//   search,
//   page,
//   size,
//   sortBy,
//   sortThrough,
//   priceMin,
//   priceMax,
// }) => {
//   let categoriesString = category && `category=[${category}]`;
//   let searcTearm = search && `&search=${search}`;
//   let sort = `&orderBy[${sortBy}]=${sortThrough}`;
//   let maxPrice = `&price[max]=${priceMax}`;
//   let minPrice = `&price[min]=${priceMin}`;
//   try {
//     let res = await axios.get(
//       `${baseURL}/products?${[categoriesString] || ""}${
//         searcTearm || ""
//       }pagination[page]=${page}&pagination[pageSize]=${size}${sortBy && sort}${
//         priceMin && minPrice
//       }${priceMax && maxPrice}`
//     );
//     if (res?.status === 200) {
//       return res;
//     }
//   } catch (error) {
//     console.log(error);
//   }
//   return false;
// };

// "https://dhyani.mtlapi.socialseller.in/api/products?&pagination[page]=1&pagination[pageSize]=20&orderBy[price]=low-to-high";
// "https://dhyani.mtlapi.socialseller.in/api/products?pagination[page]=1&pagination[pageSize]=20&orderBy[price]=low-to-high";

export const getFilterProduct = async ({
  category,
  search,
  sortBy,
  sortThrough,
  priceMin,
  priceMax,
}) => {
  let categoriesString = category && `category=[${category}]`;
  let searcTearm = search && `&search=${search}`;
  let sort = `&orderBy[${sortBy}]=${sortThrough}`;
  let maxPrice = `&price[max]=${priceMax}`;
  let minPrice = `&price[min]=${priceMin}`;
  try {
    let res = await axios.get(
      `${baseURL}/products?${[categoriesString] || ""}${searcTearm || ""}${
        sortBy && sort
      }${priceMin && minPrice}${priceMax && maxPrice}`
    );
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const getFilterCategory = async ({
  id,
  page,
  size,
  sortBy,
  sortThrough,
  priceMin,
  priceMax,
}) => {
  let sort = `sortBy[${sortBy}]=${sortThrough}`;
  let maxPrice = `price[max]=${priceMax}`;
  let minPrice = `price[min]=${priceMin}`;
  try {
    let res = await axios.get(
      `${baseURL}/categories/${id}/products?&pagination[page]=${page}&pagination[pageSize]=${size}&${
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

export const GeneratePdf = async (id) => {
  try {
    let res = await axios.get(`${baseURL}/products/create-pdf/${id}`, {
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

export const enquireLeads = async (data) => {
  let user = data?.user === undefined ? false : true;
  try {
    let res = await axios.post(
      `${baseURL}/store-leads`,
      data,
      !user ? null : getStoreHeader()
    );

    if (res?.status === 200 || res?.status === 201) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const ordersStats = async () => {
  try {
    let res = await axios.get(
      `${baseURL}/order-variants/store-users/stats`,
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

export const getSelectedProductVariants = async (ids) => {
  try {
    let res = await axios.post(`${baseURL}/custom/selectedProductVariant`, {
      product_variants: ids,
    });
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
    let res = await axios.get(`${baseURL}/products/${id}`);
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const deleteVariant = async (id) => {
  try {
    let res = await axios.delete(`${baseURL}/variants/${id}`);
    if (res?.status === 200) {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const shareProduct = async (id) => {
  try {
    let res = await axios.post(`${baseURL}/products/${id}/share`);
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

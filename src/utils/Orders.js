// import { axios } from "./Store/Axios";
import { baseURL, getHeader } from "./const_API";
import { FailureAlert } from "../components/Toast";
import axios from "axios";

export const getOrdersID = async () => {
  try {
    let res = await axios.get(`${baseURL}/orders`, getHeader());
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const getOrders = async () => {
  try {
    let res = await axios.get(
      `${baseURL}/orders?populate[0]=order_products.product_variant.product.thumbnail`,
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

export const getOrderDetail = async (id) => {
  try {
    let res = await axios.get(`${baseURL}/order-variants/${id}`, getHeader());
    if (res?.status === 200) {
      return res?.data;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const deleteOrder = async (id) => {
  try {
    let res = await axios.delete(`${baseURL}/orders/${id}`, getHeader());
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const getProductVariantList = async (id) => {
  try {
    const res = await axios.get(
      `${baseURL}/product-variants/${id}`,
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

export const postOrder = async (data) => {
  try {
    let res = await axios.post(`${baseURL}/custom/checkout`, data, getHeader());
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
    FailureAlert(error?.response?.data?.message);
  }
  return false;
};

export const updateOrder = async (id, data) => {
  try {
    const res = await axios.put(
      `${baseURL}/order-products/${id}`,
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

export const getOrdersByStatus = async (status, page, size) => {
  try {
    let res = await axios.get(
      `${baseURL}/order-variants?status=${status}&pagination[page]=${page}&pagination[pageSize]=${size}`,
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

export const getOrderStats = async () => {
  try {
    let res = await axios.get(`${baseURL}/order-variants/stats`, getHeader());
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const acceptOrder = async (id) => {
  try {
    let res = await axios.put(
      `${baseURL}/order-variants/${id}/accept`,
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

export const rejectOrder = async (id) => {
  try {
    let res = await axios.put(
      `${baseURL}/order-variants/${id}/decline`,
      getHeader()
    );
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
    FailureAlert("Somthing went wrong");
  }
  return false;
};

export const shipNowOrder = async (data) => {
  try {
    let res = await axios.post(`${baseURL}/custom-courier`, data, getHeader());
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const markAsDelivered = async (id) => {
  try {
    let res = await axios.put(
      `${baseURL}/order-variants/${id}/deliver`,
      {},
      getHeader()
    );
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
};

export const returnToOrigin = async (id) => {
  try {
    let res = await axios.put(
      `${baseURL}/order-variants/${id}/return-request`,
      { status: "RTO" },
      getHeader()
    );
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
};

export const payout = async (id) => {
  try {
    let res = await axios.get(
      `${baseURL}/orders/reseller/payout/${id}`,
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

export const getSearchData = async (key, page, size) => {
  try {
    let res = await axios.get(
      `${baseURL}/search/orders?key=${key}&pagination[page]=${page}&pagination[size]=${size}`,
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

export const getShipRocketAddress = async () => {
  try {
    let res = await axios.get(
      `${baseURL}/ship-rocket-orders/address`,
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

export const shipRocketShipping = async (data) => {
  try {
    let res = await axios.post(
      `${baseURL}/ship-rocket-orders`,
      data,
      getHeader()
    );
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
    FailureAlert(error?.response?.data?.error);
  }
  return false;
};

export const accepetReturnReq = async (id) => {
  try {
    let res = await axios.put(
      `${baseURL}/order-variants/${id}/return-accept`,
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

export const shipRocketReturnAccept = async (data) => {
  try {
    let res = await axios.post(
      `${baseURL}/ship-rocket-orders/return`,
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

export const rejectReturnReq = async (id) => {
  try {
    let res = await axios.put(
      `${baseURL}/order-variants/${id}/return-decline`,
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

export const bulkAccOrder = async (data) => {
  try {
    let res = await axios.put(
      `${baseURL}/order-variants/bulk/accept`,
      { ids: data },
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

export const bulkRejOrder = async (data) => {
  try {
    let res = await axios.put(
      `${baseURL}/order-variants/bulk/reject`,
      { ids: data },
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

export const invoiceOrder = async (id) => {
  try {
    let res = await axios.get(`${baseURL}/orders/${id}/invoice`, {
      ...getHeader(),
      responseType: "blob",
    });
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.error(error);
  }
  return false;
};
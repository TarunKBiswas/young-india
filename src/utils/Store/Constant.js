import { webState } from "../../data/webStates";
import { getHandlerWithToken } from "./ApiCalls";
import { axios } from "./Axios";
import resizer from "./resizer";

export const IP = "https://youngindianutrition.api.socialseller.in";

export const baseURL = `${IP}/api`;
export const imageUploadURL = `${IP}/api/uploads`;

export const getStoreHeader = () => {
  const token = sessionStorage.getItem("usertoken");
  let header = {
    headers: { Authorization: "Bearer " + token },
  };
  return header;
};

export const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const reqMsg = "It is required";

export const lengthMsg = (length) => {
  return `Must be at least ${length} characters long.`;
};

export const filterOrderByTags = {
  new: "NEW",
  all: "ALL",
  accepted: "ACCEPTED",
  declined: "DECLINED",
  intransit: "INTRANSIT",
  delivered: "DELIVERED",
  cancelled: "CANCELLED",
  rto: "RTO",
  return_request: "RETURN_REQUEST",
  return_accepted: "RETURN_ACCEPTED",
  return_declined: "RETURN_DECLINED",
  return_received: "RETURN_RECEIVED",
  return_pending: "RETURN_PENDING",
  payout_done: "PAYOUT_DONE",
};

export const checkoutProgressTitles = [
  { title: "number", stage: "2%" },
  { title: "otp", stage: "35%" },
  { title: "address", stage: "66%" },
  { title: "payment", stage: "99%" },
];

export const resizeFile = (file) =>
  new Promise((resolve) => {
    resizer.imageFileResizer(
      file,
      1920,
      1080,
      "WEBP",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "file"
    );
  });

export const uploadImage = async (formData) => {
  try {
    const res = await axios.post(
      `${imageUploadURL}`,
      formData,
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

export const getPolicyData = async (tag) => {
  try {
    let res = await axios.get(`${baseURL}/store-policy?tag=${tag}`);
    if (res?.status === 200) {
      return res?.data?.data;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const getGlobadData = async () => {
  try {
    let res = await axios.get(`${baseURL}/store-globals`);
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

// STORE SETTINGS START
export const getStoreData = async () => {
  try {
    let res = await axios.get(`${baseURL}/setting`);
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const enquireLeads = async (data) => {
  try {
    let res = await axios.post(
      `${baseURL}/leads`,
      { data: data },
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

export const pdfMakerAPI = async (products) => {
  try {
    let res = await axios.post(`${baseURL}/custom/selected-products`, {
      products,
    });
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const convertToDateTime = (dateString) => {
  return new Date(dateString).toISOString()?.slice(0, 10);
};

export const getCartData = async () => {
  try {
    const res = await getHandlerWithToken("cart/me");
    console.log(res);
    if (res?.status === 200) {
      webState.cartItems = res?.data?.data?.Variants;
      webState.cartData = res?.data?.data;
    }
  } catch (error) {
    console.log(error);
  }
};

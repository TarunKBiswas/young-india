// import { axios } from "./Store/Axios";
import axios from "axios";
import { state } from "../data/state";
import resizer from "./resizer";
import Resizer from "react-image-file-resizer";

// export const IP = "http://localhost:7677";
export const IP = "https://youngindianutrition.api.socialseller.in";

export const baseURL = `${IP}/api`;
export const imageUploadURL = `${IP}/api/uploads`;
export const supportNumber = "8370044449";

// Header
export const getHeader = () => {
  const token = sessionStorage.getItem("token");
  let header = {
    headers: { Authorization: "Bearer " + token },
  };
  return header;
};

export const uploadImage = async (formData) => {
  try {
    const res = await axios.post(`${imageUploadURL}`, formData, getHeader());
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};

export const BANNER_TYPE = {
  Link: "link",
  Product: "product",
  Collection: "collection",
};

export const COLLECTION_TYPE = {
  Link: "LINK",
  Product: "PRODUCT",
  Collection: "COLLECTION",
};

export const TRANSACTION_TYPE = {
  debit: "DEBIT",
  credit: "CREDIT",
};

export const REASON = {
  withdrawl: "WITHDRAWL",
  addition: "ADDITION",
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

export const exportOrdersPdf = async (orders) => {
  try {
    let res = await axios.get(
      `${baseURL}/orders/export/${orders}`,
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

export const maxImageSize = 5 * 1024 * 1024;

export const leadSources = {
  whatsapp: "WHATSAPP",
  instagram: "INSTAGRAM",
  social_seller_website: "SOCIAL_SELLER_WEBSITE",
  youtube: "YOUTUBE_CHANNEL",
};

export const closeThankyouModal = () => {
  state.showThankYouModal = false;
};

export const thankyouModalHandler = () => {
  state.showThankYouModal = true;
  setTimeout(() => closeThankyouModal(), 2000);
};

export const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      1920,
      1080,
      "WEBP",
      80,
      0,
      (uri) => {
        resolve(uri);
      },
      "file"
    );
  });

export const resizeProductFile = (file) =>
  new Promise((resolve) => {
    resizer.imageFileResizer(
      file,
      1920,
      1080,
      "WEBP",
      80,
      0,
      (uri) => {
        resolve(uri);
      },
      "file"
    );
  });

export const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
export const emailRegExp = /^\S+@\S+\.\S+$/;

export const reqMsg = "It is required";
export const lengthMsg = (length) => {
  return `Must be at least ${length} characters long.`;
};

export const serverPaymentRequest = async (plan) => {
  try {
    let res = await axios.post(
      `${baseURL}/store-subscriptions/server-fee/checkout`,
      { subscription_type: plan },
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

export const serverPaymentverify = async (body) => {
  try {
    let res = await axios.post(
      `${baseURL}/store-subscriptions/server-fee/verify`,
      body,
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

/* eslint-disable no-undef */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { state } from "../../../data/state.js";
import { getOrderDetail, updateOrder } from "../../../utils/Orders.js";
import { useEffect } from "react";
import { getAddressList } from "../../../utils/addresses.js";
import {
  getAllProducts,
  getSingleProductVariant,
} from "../../../utils/productsAPI.js";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SuccessAlert } from "../../Toast.jsx";

const reqMsg = "It is required";
const lengthMsg = (length) => {
  return `Must be at least ${length} characters long.`;
};

const schema = yup.object({
  conName: yup.string().required(reqMsg),
  conEmail: yup.string().required(reqMsg),
  conPhone: yup.string().required(reqMsg),
});

const EditOrderPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [orderInfo, setOrderInfo] = useState(null);
  const [selectedProd, setSelectedProd] = useState(null);

  const [allProducts, setAllProducts] = useState([]);
  const [addresss, setAddress] = useState([]);
  const [variantList, setVariantList] = useState([]);
  const [isResellerOrder, setIsResellerOrder] = useState(null);

  const param = useParams();

  // GET PRODUCT DETAILS
  const getOrderDetails = async () => {
    try {
      let res = await getOrderDetail(param.id);

      if (res?.status === 200) {
        setOrderInfo(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // CALL ORDER DETAILS API
  useEffect(() => {
    if (orderInfo === null) {
      getOrderDetails();
    }
  }, []);

  // GET USER ADDRESS
  const getAddress = async () => {
    try {
      let res = await getAddressList();

      if (res?.status === 200) {
        setAddress(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // CALLING USER ADDRESS
  useEffect(() => {
    getAddress();
  }, []);

  // GET PRODUCTS LIST
  const getProducts = async () => {
    try {
      const res = await getAllProducts();
      if (res?.status === 200) {
        setAllProducts(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // CALLING PRODUCT LIST FUNCTION
  useEffect(() => {
    if (selectedProd === null) {
      getProducts();
    }
  }, []);

  // GET PRODUCT VARIANTS
  const getVariant = async (selectedProd) => {
    try {
      let res = await getSingleProductVariant(selectedProd);

      if (res?.status === 200) {
        setVariantList(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // CALLING PRODUCT VARIANTS
  useEffect(() => {
    // if (selectedProd !== null) {
    getVariant(selectedProd);
    // }
  }, [selectedProd]);

  // ADD NEW PRODUCT TO THE LIST HANDLER
  // const addProductHandler = () => {
  //     let data = { product_variant_id, sellingPrice, quantity };
  //     if (data.product_variant_id && data.quantity) {
  //         setNewProducts((prod) => [...prod, data]);
  //     }
  // }

  // PUR REQUEST WITH DATA
  const updateOrderHandler = async (data) => {
    try {
      let res = await updateOrder(param?.id, data);

      if (res?.status === 200) {
        SuccessAlert("Order Updated");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="row">
            <div className="col-sm-10 m-auto">
              <div className="card">
                <div className="card-body">
                  <div className="w-full flex items-start justify-between">
                    <div className="card-header-2">
                      <h5>Edit Order</h5>
                    </div>
                  </div>

                  <form
                    className="theme-form theme-form-2 mega-form"
                    onSubmit={handleSubmit(updateOrderHandler)}
                  >
                    <div className="card">
                      <div className="card-body">
                        <div className="theme-form theme-form-2 mega-form">
                          <div className="mb-4 row align-items-center">
                            <div className="col-sm-4">
                              <label>Consumer Name</label>
                              <input
                                className="form-control"
                                type="text"
                                placeholder="Name"
                                defaultValue={
                                  orderInfo?.attributes?.order?.data?.attributes
                                    ?.consumerName
                                }
                                {...register("conName")}
                              />
                            </div>
                            <div className="col-sm-4">
                              <label>Email</label>
                              <input
                                className="form-control"
                                type="text"
                                placeholder="Email"
                                defaultValue={
                                  orderInfo?.attributes?.order?.data?.attributes
                                    ?.consumerEmail
                                }
                                {...register("conEmail")}
                              />
                            </div>
                            <div className="col-sm-4">
                              <label>Phone</label>
                              <input
                                className="form-control"
                                type="text"
                                placeholder="Phone"
                                defaultValue={
                                  orderInfo?.attributes?.order?.data?.attributes
                                    ?.consumerPhone
                                }
                                {...register("conPhone")}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="theme-form theme-form-2 mega-form">
                          <div className="mb-4 row align-items-center">
                            <div className="col-sm-6">
                              <label>Address</label>
                              <select
                                className="js-example-basic-single w-100"
                                name="state"
                                {...register("addressID")}
                              >
                                <option disabled selected>
                                  {
                                    orderInfo?.attributes?.order?.data
                                      ?.attributes?.address?.data?.attributes
                                      ?.addressLine1
                                  }
                                </option>
                                {addresss?.map((add) => (
                                  <>
                                    <option value={add?.id}>
                                      {(add?.attributes?.addressLine1).slice(
                                        0,
                                        80
                                      )}
                                    </option>
                                  </>
                                ))}
                              </select>
                            </div>

                            <div className="col-sm-6">
                              <label>Payment Type</label>
                              <select
                                className="js-example-basic-single w-100"
                                name="state"
                                {...register("payment_mode")}
                              >
                                <option disabled selected>
                                  {
                                    orderInfo?.attributes?.order?.data
                                      ?.attributes?.payment_mode
                                  }
                                </option>
                                <option value={"PREPAID"}>Prepaid</option>
                                <option value={"COD"}>Cash on Delivery</option>
                                <option value={"WALLET"}>Wallet</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <div className="theme-form theme-form-2 mega-form">
                          <div className="mb-4 row align-items-center">
                            <div className="col-sm-4">
                              <label>Products</label>
                              <select
                                className="js-example-basic-single w-100"
                                name="state"
                                onChange={(e) =>
                                  setSelectedProd(e.target.value)
                                }
                              >
                                <option disabled selected>
                                  {
                                    orderInfo?.attributes?.product_variant?.data
                                      ?.attributes?.product?.data?.attributes
                                      ?.name
                                  }
                                </option>
                                {allProducts?.map((prod) => (
                                  <>
                                    <option value={prod?.id}>
                                      {(prod?.attributes?.name).slice(0, 80)}
                                    </option>
                                  </>
                                ))}
                              </select>
                            </div>
                            <div className="col-sm-4">
                              <label>Variant</label>
                              <select
                                className="js-example-basic-single w-100"
                                name="state"
                                {...register("variant")}
                              >
                                <option disabled selected>
                                  {
                                    orderInfo?.attributes?.product_variant?.data
                                      ?.attributes?.name
                                  }
                                </option>
                                {variantList?.attributes?.product_variants?.data?.map(
                                  (variant) => (
                                    <>
                                      <option value={variant?.id}>
                                        {variant?.attributes?.name}
                                      </option>
                                    </>
                                  )
                                )}
                              </select>
                            </div>
                            <div className="col-sm-4">
                              <label>Quantity</label>
                              <input
                                className="form-control"
                                type="text"
                                placeholder="Quantity"
                                defaultValue={
                                  orderInfo?.attributes?.product_variant?.data
                                    ?.attributes?.quantity
                                }
                                {...register("quantity")}
                              />
                            </div>
                            {/* <div className="col-sm-1 mt-4">
                                                            <div className='w-full flex items-center'>
                                                                <p className='bg-green-600 text-white rounded-md text-sm cursor-pointer hover:scale-110 transition btn duration-150' onClick={addProductHandler} >
                                                                    <AiOutlinePlusCircle className='h-6 w-6' />
                                                                </p>
                                                            </div>
                                                        </div> */}
                          </div>
                        </div>

                        <div className="theme-form theme-form-2 mega-form">
                          <div className="mb-4 row align-items-center">
                            <div className="col-sm-4 flex items-center gap-2 pt-6">
                              <label className="pt-2">Reseller Order?</label>
                              <div className="form-check form-switch pt-1">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="flexSwitchCheckDefault"
                                  value={isResellerOrder}
                                  onChange={() =>
                                    setIsResellerOrder(!isResellerOrder)
                                  }
                                  checked={
                                    orderInfo?.attributes?.order?.data
                                      ?.attributes?.isResellerOrder
                                      ? "checked"
                                      : ""
                                  }
                                />
                              </div>
                            </div>
                            {orderInfo?.attributes?.order?.data?.attributes
                              ?.isResellerOrder ? (
                              <div className="col-sm-4">
                                <label>Selling Price</label>
                                <input
                                  className="form-control"
                                  type="text"
                                  placeholder="Selling price"
                                  defaultValue={
                                    orderInfo?.attributes?.sellingPrice
                                  }
                                  onChange={(e) =>
                                    setSellingPrice(e.target.value)
                                  }
                                  {...register("sellingPrice")}
                                />
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full flex items-center justify-end">
                      <button className="submitButton">Submit</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditOrderPage;

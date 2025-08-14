import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  getSingleProductVariant,
  listAllProducts,
} from "../../../utils/productsAPI.js";
import { postOrder } from "../../../utils/Orders.js";
import { getSingleUserAddress } from "../../../utils/addresses.js";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { getUsers } from "../../../utils/usersAPI.js";
import { useNavigate } from "react-router-dom";
import DataDropDown from "../UI/DataDropDown.jsx";
import {
  lengthMsg,
  phoneRegExp,
  reqMsg,
  thankyouModalHandler,
} from "../../../utils/const_API.js";
import { BsTrash } from "react-icons/bs";
import InputComp from "../UI/Inputs/InputComp.jsx";

const schema = yup.object({
  conName: yup.string().required(reqMsg).min(4, lengthMsg(4)),
  conPhone: yup
    .string()
    .required("required")
    .matches(phoneRegExp, "Number is not valid")
    .min(10, "Please enter valid number")
    .max(10, "Please enter valid number"),
  conEmail: yup.string().required(reqMsg).min(6, lengthMsg(6)),
  payment_mode: yup.string().required(reqMsg),
});

const CreateOrder = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [allProducts, setAllProducts] = useState([]);
  const [selectedProd, setSelectedProd] = useState(null);
  const [isResellerOrder, setIsResellerOrder] = useState(false);
  const [variantList, setVariantList] = useState([]);
  const [address, setAddress] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const [products, setProducts] = useState([]);
  const [product_variant_id, setProduct_variant_id] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [sellingPrice, setSellingPrice] = useState(null);

  const navigate = useNavigate();

  const getProducts = async () => {
    try {
      const res = await listAllProducts();
      if (res?.status === 200) {
        setAllProducts(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

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

  useEffect(() => {
    if (selectedProd !== null) {
      getVariant(selectedProd?.id);
    }
  }, [selectedProd]);

  const getAddress = async (selectedUser) => {
    try {
      let res = await getSingleUserAddress(selectedUser);

      if (res?.status === 200) {
        setAddress(res?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (selectedUser !== null) {
      getAddress(selectedUser?.id);
    }
  }, [selectedUser]);

  const getUsersList = async () => {
    try {
      const res = await getUsers();
      if (res?.status === 200) {
        setAllUsers(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsersList();
  }, []);

  const addProductHandler = () => {
    let data = { product_variant_id, sellingPrice, quantity };
    if (data.product_variant_id && data.quantity) {
      setProducts((prod) => [...prod, data]);
    }
  };

  const deleteOrderHandler = (id) => {
    let data = products?.filter((p, i) => i !== id);
    setProducts(data);
  };

  const orderFormHandler = async (data) => {
    let finalData = {
      consumer: { ...data, isResellerOrder },
      products,
      user_id: selectedUser?.id,
    };

    try {
      let res = await postOrder(finalData);
      if (res?.status === 200) {
        thankyouModalHandler();
        navigate("/orders");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card">
      <div className="w-full flex items-start justify-between">
        <div className="card-header-2">
          <h5>Add Order</h5>
        </div>
      </div>

      <form
        className="theme-form theme-form-2 mega-form"
        onSubmit={handleSubmit(orderFormHandler)}
      >
        <div className="card">
          <div className="card-body">
            <div className="theme-form theme-form-2 mega-form">
              <div className="mb-4 row align-items-center">
                <InputComp
                  label={"Consumer Name"}
                  register={register}
                  registerValue={"conName"}
                  errors={errors.conName?.message}
                  size={"col-sm-4"}
                />
                <InputComp
                  label={"Email"}
                  register={register}
                  registerValue={"conEmail"}
                  errors={errors.conEmail?.message}
                  size={"col-sm-4"}
                />
                <InputComp
                  label={"Phone"}
                  register={register}
                  registerValue={"conPhone"}
                  errors={errors.conPhone?.message}
                  size={"col-sm-4"}
                />
              </div>
            </div>

            <div className="theme-form theme-form-2 mega-form">
              <div className="mb-4 row align-items-center">
                <div className="col-sm-4">
                  <label>
                    User<span className="text-red-500">*</span>
                  </label>

                  <DataDropDown
                    data={allUsers}
                    selected={selectedUser}
                    setSelected={setSelectedUser}
                  />
                </div>

                <div className="col-sm-4 my-4 lg:my-0">
                  <label>
                    Address<span className="text-red-500">*</span>
                  </label>
                  <select
                    className="js-example-basic-single w-full outline-none border-gray-200 rounded ring-0 focus:ring-0"
                    name="state"
                    {...register("addressID")}
                  >
                    <option disabled selected>
                      Select Address
                    </option>
                    {address?.addresses?.map((add, i) => (
                      <option value={add?.id} key={i}>
                        {add.addressLine1.slice(0, 80)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-sm-4">
                  <label>
                    Payment Type
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="js-example-basic-single w-full outline-none border-gray-200 rounded ring-0 focus:ring-0"
                    name="state"
                    {...register("payment_mode")}
                  >
                    <option disabled selected>
                      Select Payment Type
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
                  <label>
                    Products<span className="text-red-500">*</span>
                  </label>

                  <DataDropDown
                    data={allProducts}
                    selected={selectedProd}
                    setSelected={setSelectedProd}
                  />
                </div>
                <div className="col-sm-4 ">
                  <label>
                    Variant<span className="text-red-500">*</span>
                  </label>
                  <select
                    className="js-example-basic-single w-full"
                    name="state"
                    onChange={(e) => setProduct_variant_id(e.target.value)}
                  >
                    <option disabled selected>
                      Select Variant
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

                <div className="col-sm-3">
                  <label>
                    Quantity<span className="text-red-500">*</span>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                  <p className="text-red-600 text-sm ">
                    {errors.quantity?.message}
                  </p>
                </div>
                <div className="col-sm-1 mt-4">
                  <div className="w-full flex items-center">
                    <p
                      className="bg-[#222222] text-white rounded-md text-sm cursor-pointer hover:scale-110 transition p-1.5 duration-150"
                      onClick={addProductHandler}
                    >
                      <AiOutlinePlusCircle className="h-6 w-6" />
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="theme-form theme-form-2 mega-form">
              <div className="mb-4 row align-items-center">
                <div className="col-sm-4 flex items-center pt-6">
                  <label className="pt-2">Reseller Order?</label>
                  <div className="form-check form-switch pt-1">
                    <input
                      className=""
                      type="checkbox"
                      value={isResellerOrder}
                      onClick={() => setIsResellerOrder(!isResellerOrder)}
                      checked={isResellerOrder ? "checked" : ""}
                    />
                  </div>
                </div>
                {isResellerOrder ? (
                  <div className="col-sm-4">
                    <label>Selling Price</label>
                    <input
                      className="form-control"
                      type="number"
                      placeholder="Selling price"
                      value={sellingPrice}
                      onChange={(e) => setSellingPrice(e.target.value)}
                    />
                  </div>
                ) : null}
              </div>
            </div>

            {products?.length > 0 ? (
              <>
                <label label className="form-label-title col-sm-1 mb-0"></label>
                <div className="col-sm-8 mt-2 flex items-start justify-start">
                  <table className="table-fixed w-full text-center">
                    <thead>
                      <tr>
                        <th>Variant</th>
                        <th>Quantity</th>
                        {isResellerOrder ? <th>Selling Price</th> : null}
                      </tr>
                    </thead>
                    <tbody>
                      {products?.map((data, i) => (
                        <tr key={i}>
                          <td>{data?.product_variant_id}</td>
                          <td>{data?.quantity}</td>
                          {isResellerOrder ? (
                            <td>
                              {"₹"} {data?.sellingPrice}
                            </td>
                          ) : null}
                          <td>
                            <BsTrash
                              className="text-red-600 cursor-pointer"
                              onClick={() => deleteOrderHandler(i)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <label className="form-label-title col-sm-3 mb-0"></label>
              </>
            ) : null}
          </div>
        </div>
        <div className="w-full flex items-center justify-end">
          <button className="submitButton">Submit</button>
        </div>
      </form>
      {/* </div> */}
    </div>
  );
};

export default CreateOrder;

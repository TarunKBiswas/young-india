/* eslint-disable react-hooks/exhaustive-deps */

import { useState } from "react";
import SearchInput from "../components/Admin/UI/SearchInput";
import { state } from "../data/state";
import { getAllProductsList, getSearchProduct } from "../utils/productsAPI";
import { useEffect } from "react";
import { getCategories, getCategoryProduct } from "../utils/categoryAPI";
import DemoProductCard from "../components/Admin/Orders/DemoPage/DemoProductCard";
import { useSnapshot } from "valtio";
import UserAvatarInfo from "../components/Admin/UI/UserAvatarInfo";
import { BsTrash } from "react-icons/bs";

const CreateOrderDemo = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState(undefined);
  const [activeCat, setActiveCat] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState("COD");
  const snap = useSnapshot(state);

  const getCategoryData = async () => {
    try {
      const res = await getCategories(search);
      if (res?.status === 200) {
        setCategories(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getProducts = async () => {
    try {
      const res = await getAllProductsList(1, 10);
      if (res?.status === 200) {
        setProducts(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategoryData();
    getProducts();
  }, []);

  const categoryProductHandler = async (id) => {
    setActiveCat(id);

    try {
      const res = await getCategoryProduct(id);
      if (res?.status === 200) {
        setProducts(res?.data?.data?.attributes?.products?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const searchHandler = async () => {
    try {
      const res = await getSearchProduct(search);
      if (res?.status === 200) {
        setProducts(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (snap.demoUserData === null) {
      setTimeout(() => {
        state.showSelectUserModal = true;
      }, 500);
    }
  }, []);

  const paymentTypes = [
    {
      type: "COD",
      value: "COD",
    },
    {
      type: "PREPAID",
      value: "PREPAID",
    },
    {
      type: "WALLET",
      value: "WALLET",
    },
  ];

  const removeOrderProductsHandler = (id) => {
    let newCartProducts = snap.orderProductsData?.filter(
      (item) => item.product_variants_id !== id
    );
    state.orderProductsData = newCartProducts;
  };

  return (
    <>
      <div className="card">
        <div className="w-full flex items-start gap-3">
          {/* left side */}
          <div
            className={`w-full  ${
              snap?.orderProductsData.length > 0 ? "max-w-[75%] " : null
            }  p-2 flex items-center flex-col gap-4`}
          >
            {/* heading */}
            <div className="w-full flex items-center justify-between">
              <div
                className={` ${
                  snap.demoUserData === null ? "hidden" : "block"
                } `}
              >
                <UserAvatarInfo user={snap.demoUserData} />
              </div>
            </div>

            <hr className="w-full" />

            {/* search */}
            <div className="w-full">
              <SearchInput
                search={search}
                setSearch={setSearch}
                handler={searchHandler}
              />
            </div>

            {/* categories */}
            <div className="w-full flex flex-col gap-2">
              <span className="text-lg font-semibold">Categories</span>
              <div className="w-full flex items-center gap-2 overflow-x-scroll scrollbar-hide">
                {categories?.map((item, i) => (
                  <div
                    key={i}
                    className={` border px-2.5 py-0.5 ${
                      activeCat === item?.id
                        ? "bg-themecolor text-white "
                        : null
                    } bg-gray-200 text-gray-600 cursor-pointer rounded-full`}
                    onClick={() => categoryProductHandler(item?.id)}
                  >
                    <span className="text-sm capitalize">
                      {item?.attributes?.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* products */}
            <div
              className={`w-full grid ${
                snap?.orderProductsData?.length > 0
                  ? "grid-cols-4 "
                  : "grid-cols-5"
              }   gap-3 overflow-y-scroll scrollbar-hide`}
            >
              {products?.map((item) => (
                <DemoProductCard key={item?.id} data={item} />
              ))}
            </div>
          </div>

          {/* right side*/}
          {snap?.orderProductsData.length > 0 ? (
            <div
              className={` w-full max-w-[25%] border shadow-sm pb-4 py-2 px-6 rounded flex flex-col items-start justify-between `}
            >
              {/* heading and cancel button */}
              <div className="w-full flex items-center justify-between">
                <span className="text-lg font-medium">My products</span>
              </div>

              {/* products */}
              <div className="w-full flex flex-col mt-3 min-h-[570px] max-h-[500px] overflow-y-scroll scrollbar-hide">
                {snap.orderProductsData?.map((item, i) => {
                  return (
                    <div className="pb-2" key={i}>
                      <div className="flex max-w-md bg-white border rounded-lg overflow-hidden">
                        <img
                          className="w-1/3 h-[100px] object-cover object-top"
                          src={item?.thumbnail?.url}
                          width={"auto"}
                          height={"auto"}
                          alt="image"
                        />
                        <div className="w-2/3 px-4 py-2">
                          <div className="w-full flex items-center justify-between">
                            <span className="text-gray-600 font-semibold text-base">
                              {item?.name}
                            </span>
                            <span>
                              <BsTrash
                                className="text-red-500 hover:scale-110 transition-all duration-300 cursor-pointer"
                                onClick={() =>
                                  removeOrderProductsHandler(
                                    item?.product_variants_id
                                  )
                                }
                              />
                            </span>
                          </div>

                          <div className="flex flex-col item-center justify-between mt-2 gap-1 ">
                            <span className="text-gray-700 text-xs">
                              {item?.desc?.slice(0, 50)}
                            </span>
                            <span className="text-gray-700 text-sm ">
                              Quantity:{" "}
                              <span className="font-medium">
                                {item?.quantity}
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* payment options */}
              <div className="w-full flex flex-col gap-3 mt-4">
                <div className="w-full h-full flex flex-col items-start">
                  <span className="text-lg font-medium">Payment Options</span>
                  <div className="w-full flex items-start gap-4 mt-2">
                    {paymentTypes?.map((type) => (
                      <div
                        className={`py-1.5 px-3 border rounded-lg cursor-pointer ${
                          selectedPayment === type.type
                            ? "bg-themecolor text-gray-200 font-medium"
                            : null
                        } `}
                        key={type.type}
                        onClick={() => setSelectedPayment(type.value)}
                      >
                        {type.value}
                      </div>
                    ))}
                  </div>
                </div>

                {/* checkout button */}
                <div className="w-full">
                  <button className="w-full p-2 bg-themecolor rounded-lg font-medium text-white text-base">
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default CreateOrderDemo;

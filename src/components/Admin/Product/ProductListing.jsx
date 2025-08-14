/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { state } from "../../../data/state.js";
import {
  exportProduct,
  getAllProductsList,
  getSearchProduct,
  updateProductStatus,
  listAllProducts,
} from "../../../utils/productsAPI.js";
import { useSnapshot } from "valtio";
import CreateButton from "../UI/Buttons/CreateButton.jsx";
import { TBody, TD, TH, THead, TR, XTable } from "../UI/Table/XTable.jsx";
import ProductInfoCard from "./ProductInfoCard.jsx";
import SearchInput from "../UI/SearchInput.jsx";
import Actions from "../UI/Actions.jsx";
import PaginationContainer from "../UI/PaginationContainer.jsx";
import NumberCircle from "./NumberCircle.jsx";
import { SuccessAlert } from "../../Toast.jsx";
import { toast } from "react-toastify";
import ProductTabs from "./ProductTabs.jsx";
import OutletWrapper from "../../../Pages/OutletWrapper.jsx";
import BulkUpload from "./BulkUpload.jsx";

const ProductListing = () => {
  const [search, setSearch] = useState("");
  const [showBulkUpload, setShowBulkUpload] = useState(false);
  const snap = useSnapshot(state);
  const tag = snap.productStatsTag;
  const pagination = snap.productsPagination;
  const navigate = useNavigate();

  const getAllProducts = async (page) => {
    try {
      const res = await getAllProductsList(page, pagination.pageSize, tag);
      if (res?.status === 200) {
        state.products = res?.data?.data;
        state.productsPagination = {
          ...pagination,
          page: res?.data?.meta?.pagination?.page,
          pageSize: res?.data?.meta?.pagination?.pageSize,
          pageCount: res?.data?.meta?.pagination?.pageCount,
          total: res?.data?.meta?.pagination?.total,
        };
      }
    } catch (error) {
      console.log(error);
    }
  };

  const searchHandler = async (search) => {
    try {
      const res = await getSearchProduct(search);
      if (res?.status === 200) {
        state.products = res?.data?.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts(pagination.page);
    state.refreshProductList = false;
  }, [snap.refreshProductList, pagination.page, tag]);

  const getPrevPage = () => {
    if (pagination.page > 1) {
      state.productsPagination = {
        ...pagination,
        page: pagination.page - 1,
      };
    }
  };

  const getNextPage = () => {
    if (pagination.page < pagination.pageCount) {
      state.productsPagination = {
        ...pagination,
        page: pagination.page + 1,
      };
    }
  };

  const prodDeleteHandler = (id) => {
    state.selectedProdID = id;
    state.showDeleteProductModal = true;
  };

  const prodDetailsHandler = (id) => {
    navigate(`${id}`);
  };

  const prodEditHandler = (id) => {
    navigate(`edit/${id}`);
  };

  const statusChangeHandler = async (id) => {
    snap.products?.map((item) => {
      if (item?.id === id) {
        try {
          toast.promise(updateProductStatus(id, { is_active: !item.is_active }), {
            loading: "Updating...",
            success: <b>Product Status Updated!</b>,
            error: <b>Could not save.</b>,
          });
          state.refreshProductList = true;
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  // const exportHandler = async (id) => {
  //   let data = { items: id };

  //   const res = await exportProduct(data);
  //   if (res.status === 200) {
  //     const buffer = await res?.data;
  //     const blob = new Blob([buffer]);
  //     const link = document.createElement("a");
  //     link.href = URL.createObjectURL(blob);
  //     link.download = "product.xlsx";
  //     link.click();
  //     link.remove();
  //     SuccessAlert("Product Exported");
  //   }
  // };

  const exportHandler = async () => {
    try {
      const res = await listAllProducts();
      if (res?.status === 200) {
        const data = { items: res.data.data.map((product) => product.id) };
        const exportRes = await exportProduct(data);
        if (exportRes.status === 200) {
          const buffer = await exportRes?.data;
          const blob = new Blob([buffer]);
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = "product.xlsx";
          link.click();
          link.remove();
          SuccessAlert("Product Exported");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to export products");
    }
  };

  const bulkUploadModalHandler = () => {
    setShowBulkUpload(true);
  };

  return (
    <OutletWrapper>
      <div className="w-full flex items-center justify-between">
        <span className="text-2xl font-semibold">Products</span>
        <div className="max-w-3xl flex flex-col md:flex-row items-center gap-2.5">
          <div className="hidden lg:flex">
            <SearchInput search={search} setSearch={setSearch} handler={searchHandler} />
          </div>
          <div className="flex flex-col lg:flex-row gap-2">
            <CreateButton title={"New Product"} to={"add"} />
            <CreateButton title={"Bulk Import"} action={bulkUploadModalHandler} />
            <CreateButton
              title={"Export to csv"}
              // action={() => exportHandler(snap?.products?.map((id) => id.id))}
              action={exportHandler}
            />

            <div className="flex lg:hidden">
              <SearchInput search={search} setSearch={setSearch} handler={searchHandler} />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-end my-2">
        <ProductTabs />
      </div>

      {snap.products?.length > 0 && (
        <XTable style={"mt-2"}>
          <THead>
            <TH>s.No</TH>
            <TH>Info</TH>
            <TH>Quantity</TH>
            <TH>Orders</TH>
            <TH>Returns</TH>
            <TH>Revenue</TH>
            <TH>Status</TH>
            <TH></TH>
          </THead>

          <TBody>
            {snap.products?.map((prod, index) => {
              var sum = 0;
              prod?.variants?.map((pv) => {
                sum += pv.quantity;
              });

              // Calculate the global index based on the current page and page size
              const globalIndex = (pagination.page - 1) * pagination.pageSize + index + 1;

              return (
                <TR key={prod?.id}>
                  <TD>{globalIndex}</TD>
                  <TD>
                    <ProductInfoCard prod={prod} detailsHandler={prodDetailsHandler} />
                  </TD>

                  <NumberCircle prod={sum} />
                  <NumberCircle prod={prod?.product_metrics?.ordered_count} />
                  <NumberCircle prod={prod?.product_metrics?.return_count} />
                  <NumberCircle prod={prod?.product_metrics?.revenue_generated} />
                  <TD>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        value=""
                        className="sr-only peer"
                        checked={prod?.is_active}
                        onChange={() => statusChangeHandler(prod?.id)}
                      />
                      <div className="w-9 h-5 bg-gray-200  rounded-full peer  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-[#222222]"></div>
                    </label>
                  </TD>
                  <TD>
                    <Actions data={prod} editHandler={prodEditHandler} deleteHandler={prodDeleteHandler} />
                  </TD>
                </TR>
              );
            })}
          </TBody>
        </XTable>
      )}

      {snap.products?.length > 0 && (
        <PaginationContainer pagination={pagination} getNextPage={getNextPage} getPrevPage={getPrevPage} />
      )}

      {showBulkUpload && <BulkUpload setShowModal={setShowBulkUpload} />}
    </OutletWrapper>
  );
};

export default ProductListing;

/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import FormModal from "../../Modals/FormModal.jsx";
import { state } from "../../../../data/state.js";
import { listAllProducts } from "../../../../utils/productsAPI.js";
import Multiselect from "multiselect-react-dropdown";
import {
  getSingleStaticCollection,
  updateStaticCollection,
} from "../../../../utils/staticCollection.js";
import { useSnapshot } from "valtio";
import { SuccessAlert } from "../../../Toast.jsx";

const EditStaticCollectionModal = () => {
  const snap = useSnapshot(state);
  let id = snap.selectedStaticCollID;
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProd, setSelectedProd] = useState([]);
  const [productsTemp, setProductsTemp] = useState([]);

  const getData = async () => {
    try {
      let res = await getSingleStaticCollection(id);
      setData(res?.data);
      setProductsTemp(res?.data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  const getProducts = async () => {
    try {
      const res = await listAllProducts();
      if (res?.status === 200) {
        setProducts(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
    getData();
  }, []);

  const selectProductsHandler = (e) => {
    e.map((id) => setSelectedProd([...selectedProd, id.id]));
  };

  const removeProductsHandler = (e) => {
    selectedProd.filter((item) => item.selectedProd !== e[0].id);
  };

  const editModalHandler = () => {
    state.showEditStaticCollModal = false;
  };

  const removePrevProdHandler = (id) => {
    let newPrevProdList = productsTemp.filter((item) => item.id !== id);
    setProductsTemp(newPrevProdList);
  };

  const submitHandler = async () => {
    let previousProductList = productsTemp?.map((id) => id.id);
    let newList = previousProductList.concat(
      selectedProd.filter((item) => previousProductList.indexOf(item) < 0)
    );
    let finalData = { products: newList };

    try {
      let res = await updateStaticCollection(id, finalData);
      state.showEditStaticCollModal = false;
      state.refreshStaticCollctionList = true;
      SuccessAlert("Collection Updated");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <FormModal
        closeModalHandler={editModalHandler}
        title={"Edit Static Collection"}
      >
        <div className="theme-form theme-form-2 mega-form mt-4">
          <div className="mb-4 row align-items-center">
            <label className="col-sm-3 col-form-label form-label-title">
              Products
            </label>
            <div className="col-sm-9">
              <Multiselect
                displayValue="name"
                options={products?.map((prod) => prod)}
                isObject={true}
                onSelect={(e) => selectProductsHandler(e)}
                onRemove={(e) => removeProductsHandler(e)}
              />
            </div>

            {productsTemp?.map((coll) => (
              <div className="grid grid-cols-2 mt-2 col-sm-5" key={coll.id}>
                <p
                  className="p-2 text-sm text-green-800 rounded-lg bg-green-50 gap-2"
                  role="alert"
                >
                  <span className="flex items-center justify-between">
                    {" "}
                    {coll?.name}{" "}
                    <span
                      className="font-bold hover:text-red-400 transition-all duration-300 cursor-pointer"
                      onClick={() => removePrevProdHandler(coll.id)}
                    >
                      X
                    </span>
                  </span>
                </p>
              </div>
            ))}
          </div>

          <div className="w-full flex items-center justify-end">
            <button className="submitButton" onClick={submitHandler}>
              Submit
            </button>
          </div>
        </div>
      </FormModal>
    </>
  );
};

export default EditStaticCollectionModal;

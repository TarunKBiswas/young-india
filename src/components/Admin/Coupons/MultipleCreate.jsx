import { useEffect, useState } from "react";
import { getCollections } from "../../../utils/collectionsAPI";
import { state } from "../../../data/state";
import { FailureAlert, SuccessAlert } from "../../Toast";
import SimpleModal from "../Modals/SimpleModal";
import InputCompState from "../UI/Inputs/InputCompState";
import { createCoupon } from "../../../utils/Coupons";
import { listAllProducts } from "../../../utils/productsAPI";
import Multiselect from "multiselect-react-dropdown";

const MultipleCreate = () => {
  const [coupon_code, setCouponCode] = useState("");
  const [collections, seCollections] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCollections, setSelectedCollections] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [type, setType] = useState("COLLECTION");
  const [message, setMessage] = useState("");
  const [discount_type, setDiscount] = useState("");
  const [discount_value, setDiscountValue] = useState("");

  const getCollectionData = async () => {
    try {
      let res = await getCollections();
      if (res?.status === 200) {
        seCollections(res?.data?.data);
      }
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
    getCollectionData();
    if (type === "PRODUCT") {
      getProducts();
    }
  }, [type]);

  useEffect(() => {
    if (type === "PRODUCT") {
      setSelectedCollections([]);
    } else if (type === "COLLECTION") {
      setSelectedProducts([]);
    }
  }, [type]);

  const selectProductsHandler = (e) => {
    e.map((id) => setSelectedProducts([...selectedProducts, id.id]));
  };

  const removeProductsHandler = (e) => {
    let newList = e.map((id) => id.id);
    setSelectedProducts(newList);
  };

  const selectCollectionsHandler = (e) => {
    e.map((id) => setSelectedCollections([...selectedCollections, id.id]));
  };

  const removeCollectionHandler = (e) => {
    let newList = e.map((id) => id.id);
    setSelectedCollections(newList);
  };

  const closeModalHandler = () => {
    state.showAddCouponModal = false;
  };

  const CreateCouponHandler = async () => {
    let data = {
      coupon_code,
      collections: selectedCollections,
      products: selectedProducts,
      discount_type,
      discount_value,
      message,
    };

    if (
      data?.coupon_code ||
      data?.discount_type ||
      data?.discount_value ||
      data?.message !== ""
    ) {
      closeModalHandler();
      try {
        let res = await createCoupon(data);
        // console.log(res);
        if (res === true) {
          SuccessAlert("Coupon Created");
          state.refreshCouponList = true;
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      FailureAlert("Please Fill all fields");
    }
  };

  return (
    <SimpleModal closeModalHandler={closeModalHandler} modalSize={"max-w-2xl"}>
      <div className="w-full flex flex-col p-4">
        <div className="w-full flex flex-col gap-3">
          <InputCompState
            label={"Coupon Code"}
            value={coupon_code}
            setValue={setCouponCode}
            required
            size={"w-full flex flex-col gap-1"}
          />
          <div className="w-full grid grid-cols-2 gap-4">
            <div className="w-full flex flex-col gap-1">
              <label htmlFor="">
                Disount Type <span className="text-red-500">*</span>
              </label>
              <select
                className="border-gray-200 rounded placeholder:text-sm"
                onChange={(e) => setDiscount(e.target.value)}
              >
                <option value="" selected>
                  Select Type
                </option>
                <option value="PERCENTAGE">Percentage</option>
                <option value="FLAT">Flat</option>
              </select>
            </div>
            <InputCompState
              label={"Discount Value"}
              value={discount_value}
              setValue={setDiscountValue}
              required
              type={"number"}
              size={"w-full flex flex-col gap-1"}
            />
          </div>

          <div className="w-full flex items-center gap-4">
            <div className="w-full flex flex-col gap-1">
              <label>
                Apply On <span className="text-red-500">*</span>
              </label>
              <div className="w-full">
                <select
                  className="w-full border-gray-200 rounded"
                  name="state"
                  onChange={(e) => setType(e.target.value)}
                >
                  <option selected disabled>
                    Select
                  </option>
                  <option value={"COLLECTION"}>Collection</option>
                  <option value={"PRODUCT"}>Product</option>
                </select>
              </div>
            </div>
            {type === "COLLECTION" ? (
              <div className="w-full flex flex-col gap-1">
                <label>
                  Collection <span className="text-red-500">*</span>
                </label>
                <div className="w-full">
                  <Multiselect
                    displayValue="name"
                    options={collections?.map((prod) => prod)}
                    isObject={true}
                    onSelect={(e) => selectCollectionsHandler(e)}
                    onRemove={(e) => removeCollectionHandler(e)}
                    // showCheckbox
                    className="h-full"
                  />
                </div>
              </div>
            ) : (
              <div className="w-full flex flex-col gap-1">
                <label>
                  Product <span className="text-red-500">*</span>
                </label>
                <div className="w-full">
                  <Multiselect
                    displayValue="name"
                    options={products?.map((prod) => prod)}
                    isObject={true}
                    onSelect={(e) => selectProductsHandler(e)}
                    onRemove={(e) => removeProductsHandler(e)}
                    showCheckbox
                    className="h-full "
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="w-full flex flex-col gap-1 mt-2">
          <label>
            Message<span className="text-red-500">*</span>
          </label>
          <textarea
            className="border rounded border-gray-200"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        <div className="w-full flex items-center justify-end my-3">
          <button className="submitButton" onClick={CreateCouponHandler}>
            Create
          </button>
        </div>
      </div>
    </SimpleModal>
  );
};

export default MultipleCreate;

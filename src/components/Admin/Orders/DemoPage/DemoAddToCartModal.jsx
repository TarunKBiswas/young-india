/* eslint-disable no-unused-vars */
import { useSnapshot } from "valtio";
import { state } from "../../../../data/state";
import FormModal from "../../Modals/FormModal";
import { useEffect, useState } from "react";
import DemoVariantCard from "./DemoVariantCard";
import { SuccessAlert } from "../../../Toast";

const DemoAddToCartModal = () => {
  const snap = useSnapshot(state);
  let data = snap.demoProductData;

  const [selectedVariant, setSelectedVariant] = useState(
    data?.product_variants[0]?.id
  );
  const [quantity, setQuantity] = useState(1);
  const [sellingPrice, setSellingPrice] = useState(null);
  const [isResellerOrder, setIsResellerOrder] = useState(false);
  const [products, setProducts] = useState([]);

  const modalHandler = () => {
    state.showDemoAddToCartModal = false;
  };

  const productDataHandler = () => {
    let finalData = {
      product_variants_id: selectedVariant,
      quantity: quantity,
      sellingPrice: sellingPrice,
    };
    Object.assign(finalData, data);
    if (products?.length > 0) {
      setProducts((prod) => [...prod, finalData]);
      state.orderProductsData = products;
    } else {
      state.orderProductsData?.push(finalData);
    }
    SuccessAlert("Added To Cart");
    state.showDemoAddToCartModal = false;
  };

  return (
    <FormModal closeModalHandler={modalHandler} title={"Select Variant"}>
      <div className="w-full flex flex-col items-start gap-2">
        <div className="w-full grid grid-cols-4 gap-2">
          {data?.product_variants?.map((item, i) => (
            <DemoVariantCard
              key={i}
              data={item}
              selectedVariant={selectedVariant}
              setSelectedVariant={setSelectedVariant}
            />
          ))}
        </div>
        <hr className="w-full" />
        <div className="w-full flex flex-col items-center justify-center">
          <label className="w-full">
            Quantity<span className="text-red-500">*</span>
          </label>
          <input
            className="w-full border-gray-300 rounded focus:ring-0 outline-none text-sm"
            type="text"
            placeholder="Add Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div className="w-full flex flex-col">
          <div className="w-full flex items-center gap-3">
            <label className="pt-2">Reseller Order?</label>
            <input
              className=""
              type="checkbox"
              value={isResellerOrder}
              onClick={() => setIsResellerOrder(!isResellerOrder)}
              checked={isResellerOrder ? "checked" : ""}
            />
          </div>
          {isResellerOrder ? (
            <input
              className="w-full border-gray-300 rounded focus:ring-0 outline-none text-sm"
              type="text"
              placeholder="Selling price"
              value={sellingPrice}
              onChange={(e) => setSellingPrice(e.target.value)}
            />
          ) : null}
        </div>
      </div>

      <div className="w-full flex items-center justify-end mt-4">
        <button className="submitButton" onClick={productDataHandler}>
          Add
        </button>
      </div>
    </FormModal>
  );
};

export default DemoAddToCartModal;

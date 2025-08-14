import { useState } from "react";
import { state } from "../../../data/state.js";
import { useSnapshot } from "valtio";
// import { AiFillDelete } from "react-icons/ai";
import {
  // deteleBulkPrice,
  // postBulkPricing,
  // updateBulkPricing,
  updateVariant,
} from "../../../utils/productsAPI.js";
import { SuccessAlert } from "../../Toast.jsx";
import { useParams } from "react-router-dom";
import SimpleModal from "../Modals/SimpleModal.jsx";
import UpdateButton from "../UI/Buttons/UpdateButton.jsx";

const EditVariantModal = () => {
  const snap = useSnapshot(state);
  var id = snap.selectedVariantID;
  let data = snap.selectedVariantData;

  let param = useParams();

  // const [bpList, setBpList] = useState(null);
  // const [showInput, setShowInput] = useState(false);

  // const [from, setFrom] = useState(null);
  // const [to, setTo] = useState(null);
  // const [rangePrice, setRangePrice] = useState(null);
  // const [premiumPrice, setPremiumPrice] = useState(null);

  // const [pFrom, setPFrom] = useState(null);
  // const [pTo, setPTo] = useState(null);
  // const [pPrice, setPPrice] = useState(null);
  // const [pPremumPrice, setPPremiumPrice] = useState(null);

  const [variant, setVariant] = useState({
    name: data?.name,
    price: data?.price,
    strike_price: data?.strike_price,
    // premiumPrice: data?.premiumPrice,
    quantity: data?.quantity,
  });

  // useEffect(() => {
  //   setBpList(data?.bulk_pricings);
  //   state.refreshBulkPriceList = false;
  // }, [data?.bulk_pricings, snap.refreshBulkPriceList]);

  // const removeBulkPrice = async (id) => {
  //
  //   try {
  //     let res = await deteleBulkPrice(id);
  //     if (res === true) {
  //       state.editVariantModal = false;
  //       state.refreshBulkPriceList = true;
  //       state.refreshEditProductComponent = true;
  //       SuccessAlert("Bulk Price Delete");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  //
  // };

  // const addBulkPricingInputHandler = () => {
  //   setShowInput(true);
  // };

  // const addBulkPricingHandler = async () => {
  //   let bpData = {
  //     from: Number(from),
  //     to: Number(to),
  //     price: Number(rangePrice),
  //     VariantId: id,
  //     premiumPrice: Number(pPremumPrice),
  //   };
  //   if (bpData?.from && bpData?.to && bpData?.price) {
  //
  //     try {
  //       let res = await postBulkPricing(bpData);
  //       if (res.status === 200) {
  //         setFrom("");
  //         setTo("");
  //         setRangePrice("");
  //         SuccessAlert("Bulk Price Added");
  //         state.refreshEditProductComponent = true;
  //         state.refreshBulkPriceList = true;
  //         state.editVariantModal = false;
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //
  //   }
  // };

  // const updateBulkPricingHandler = async (bpID) => {
  //   let pBpData = {
  //     to: pTo,
  //     from: pFrom,
  //     price: pPrice,
  //     VariantId: id,
  //     premiumPrice: pPremumPrice,
  //   };
  //   if (pBpData?.from && pBpData?.to && pBpData?.price) {
  //     try {
  //       let res = await updateBulkPricing(bpID, pBpData);
  //       if (res?.status === 200) {
  //         SuccessAlert("Bulk Price Updated");
  //         state.refreshEditProductComponent = true;
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   } else {
  //     InfoAlert("Please Select All the Fields");
  //   }
  // };

  const updateVariantHandler = async () => {
    // let bpID = bpList?.map((bp) => bp.id);
    let fData = {
      ...variant,
      // bulk_pricings: bpID,
      ProductId: Number(param.id),
    };
    state.isLoading = true;
    try {
      let res = await updateVariant(id, fData);
      if (res?.status === 200) {
        SuccessAlert("Variant Updated");
        state.refreshEditProductComponent = true;
        state.editVariantModal = false;
      }
      state.isLoading = false;
    } catch (error) {
      console.log(error);
    }
    state.isLoading = false;
  };

  const closeModalHandler = () => {
    state.editVariantModal = false;
  };

  return (
    <SimpleModal modalSize={"max-w-3xl"} closeModalHandler={closeModalHandler}>
      <div className="p-6">
        <span className="mb-4 text-xl font-semibold ">{data?.name}</span>

        <div className=" flex items-end gap-2 pb-2" key={data.id}>
          <div>
            <label htmlFor="">Name</label>
            <input
              className="w-full border-gray-200 text-xs"
              type="text"
              defaultValue={data?.name}
              onChange={(e) => setVariant({ ...variant, name: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="">Price</label>
            <input
              className="w-full border-gray-200 text-xs"
              type="text"
              placeholder="Price"
              defaultValue={data?.price}
              onChange={(e) =>
                setVariant({ ...variant, price: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="">Strike Price</label>
            <input
              className="w-full border-gray-200 text-xs"
              type="text"
              placeholder="Strike Price"
              defaultValue={data?.strike_price}
              onChange={(e) =>
                setVariant({ ...variant, strike_price: e.target.value })
              }
            />
          </div>
          {/* <div>
            <label htmlFor="">Premium Price</label>
            <input
              className="w-full border-gray-200 text-xs"
              type="text"
              placeholder="Premium price"
              defaultValue={data?.premiumPrice}
              onChange={(e) =>
                setVariant({ ...variant, premiumPrice: e.target.value })
              }
            />
          </div> */}
          <div>
            <label htmlFor="">Quantity</label>
            <input
              className="w-full border-gray-200 text-xs"
              type="text"
              placeholder="Quantity"
              defaultValue={data?.quantity}
              onChange={(e) =>
                setVariant({ ...variant, quantity: e.target.value })
              }
            />
          </div>
        </div>

        {/* <div className="mb-4 flex items-center flex-col">
          <div className="w-full flex items-center justify-between mt-6">
            <div className="font-semibold  ">
              <h5>Bulk Pricing</h5>
            </div>

            <div className=" flex items-center justify-center gap-4 ">
              <span
                className=" px-2 bg-[#222222] text-white rounded-sm text-md cursor-pointer hover:scale-110 transition duration-150"
                onClick={addBulkPricingInputHandler}
              >
                +
              </span>
            </div>
          </div>

          {bpList?.map((bp, i) => {
            return (
              <div className="w-full flex items-center gap-2" key={i}>
                <div className="w-full ">
                  <input
                    className="w-full border-gray-200 text-xs"
                    type="text"
                    placeholder="From"
                    defaultValue={bp?.from}
                    onChange={(e) => setPFrom(e.target.value)}
                  />
                </div>
                <div className="w-full py-2">
                  <input
                    className="w-full text-xs border-gray-200"
                    type="text"
                    placeholder="To"
                    defaultValue={bp?.to}
                    onChange={(e) => setPTo(e.target.value)}
                  />
                </div>
                <div className="w-full">
                  <input
                    className="w-full text-xs border-gray-200"
                    type="number"
                    placeholder="Price"
                    defaultValue={bp?.price}
                    onChange={(e) => setPPrice(e.target.value)}
                  />
                </div>
                <div className="w-full">
                  <input
                    className="w-full text-xs border-gray-200"
                    type="number"
                    placeholder="Premium Price"
                    defaultValue={bp?.premiumPrice}
                    onChange={(e) => setPPremiumPrice(e.target.value)}
                  />
                </div>
                <div className="flex gap-2 items-center">
                  <span
                    className="pointer p-1 bg-green-800 text-white rounded-sm text-xs cursor-pointer hover:scale-110 transition duration-150"
                    onClick={() => updateBulkPricingHandler(bp?.id)}
                  >
                    Update
                  </span>
                  <AiFillDelete
                    className="text-red-500 cursor-pointer h-5 w-5"
                    onClick={() => removeBulkPrice(bp?.id)}
                  />
                </div>
              </div>
            );
          })}

          {showInput ? (
            <div className="col-sm-12 flex items-center w-full gap-8">
              <div className="w-full py-2">
                <input
                  className="w-full border-gray-200"
                  type="text"
                  placeholder="From"
                  value={from}
                  onChange={(e) => {
                    setFrom(e.target.value);
                  }}
                />
              </div>
              <div className="w-full">
                <input
                  className="w-full border-gray-200"
                  type="text"
                  placeholder="To"
                  value={to}
                  onChange={(e) => {
                    setTo(e.target.value);
                  }}
                />
              </div>
              <div className="w-full">
                <input
                  className="w-full border-gray-200"
                  type="number"
                  placeholder="Price"
                  value={rangePrice}
                  onChange={(e) => setRangePrice(e.target.value)}
                />
              </div>
              <div className="w-full">
                <input
                  className="w-full border-gray-200"
                  type="number"
                  placeholder="Premium Price"
                  value={premiumPrice}
                  onChange={(e) => setPremiumPrice(e.target.value)}
                />
              </div>
              <div
                className="px-2 py-1 bg-[#222222] text-white rounded-md cursor-pointer"
                onClick={addBulkPricingHandler}
              >
                Add
              </div>
            </div>
          ) : null}
        </div> */}

        <UpdateButton func={updateVariantHandler} />
      </div>
    </SimpleModal>
  );
};

export default EditVariantModal;

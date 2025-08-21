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
import Multiselect from "multiselect-react-dropdown";

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
    primary_attribute: {
      value: data?.primary_attribute?.value || "",
    },
  });

  const [selectedWeights, setselectedWeights] = useState(
    data?.secondary_attribute?.value || []
  );
  console.log(id);
  const [weightsPricing, setWeightsPricing] = useState(
    data?.weights_pricing
      ? data.weights_pricing.map((p) => ({
          ...p,
          price: p.price?.toString() || "",
          strike_price: p.strike_price?.toString() || "",
          quantity: p.quantity?.toString() || "",
        }))
      : []
  );

  const weights = [
    { label: "500gm", value: "500gm" },
    { label: "1kg", value: "1kg" },
    { label: "2kg", value: "2kg" },
    { label: "3kg", value: "3kg" },
    { label: "4kg", value: "4kg" },
    { label: "5kg", value: "5kg" },
  ];

  const handleWeightChange = (selectedList) => {
    const newWeights = selectedList.map((item) => item.value);
    setselectedWeights(newWeights);

    // Initialize / preserve pricing per weight
    setWeightsPricing((prev) => {
      return newWeights.map((w) => {
        const existing = prev.find((p) => p.weight === w);
        return (
          existing || {
            weight: w,
            price: "",
            strike_price: "",
            quantity: "",
            booking_price: "",
            premium_price: "",
          }
        );
      });
    });
  };
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
    // let fData = {
    //   ...variant,
    //   // bulk_pricings: bpID,
    //   ProductId: Number(param.id),
    // };
    let fData = {
      name: variant.name,
      price: Number(variant.price),
      strike_price: Number(variant.strike_price),
      // premiumPrice: Number(variant.premiumPrice),
      quantity: Number(variant.quantity),
      // booking_price: Number(variant.booking_price),
      ProductId: Number(param.id),
      //  ThumbnailId: variant.ThumbnailId, // assuming you have this value somewhere
      //  gallery: variant.gallery, // assuming you have this value somewhere
      primary: {
        name: "Flavour",
        values: {
          value: variant.primary_attribute.value,
          hex_code: "",
        },
      },
      secondary: {
        name: "Weights",
        values: {
          value: selectedWeights,
          hex_code: "",
        },
      },
      weights_pricing: weightsPricing,
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
  const handlePricingChange = (index, field, value) => {
    const newPricing = [...weightsPricing];
    newPricing[index][field] = value;
    setWeightsPricing(newPricing);
  };

  return (
    <SimpleModal modalSize={"max-w-3xl"} closeModalHandler={closeModalHandler}>
      <div className="p-6">
        <span className="mb-4 text-xl font-semibold ">
          {data?.name || variant?.primary_attribute?.value}
        </span>

        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4 mt-2"
          key={data.id}
        >
          {/* --- Flavour + Weights Flow (toggle ON) --- */}
          {variant?.primary_attribute?.value ? (
            <>
              {/* Flavour */}
              <div>
                <label>Flavour</label>
                <input
                  className="w-full border border-gray-200 rounded p-2"
                  type="text"
                  value={variant?.primary_attribute?.value || ""}
                  onChange={(e) =>
                    setVariant({
                      ...variant,
                      primary_attribute: {
                        ...variant.primary_attribute,
                        value: e.target.value,
                      },
                    })
                  }
                />
              </div>

              {/* Weights */}
              <div>
                <label>Weights</label>
                <Multiselect
                  options={weights}
                  selectedValues={weights.filter((size) =>
                    selectedWeights.includes(size.value)
                  )}
                  onSelect={handleWeightChange}
                  onRemove={handleWeightChange}
                  displayValue="label"
                  placeholder="Select Weights"
                  style={{
                    chips: { fontSize: "12px" },
                    multiselectContainer: { fontSize: "14px" },
                    searchBox: { fontSize: "14px", padding: "2px 8px" },
                    option: { fontSize: "14px", padding: "3px 8px" },
                    inputField: {
                      fontSize: "14px",
                      padding: "3px 8px",
                      width: "100%",
                    },
                  }}
                />
              </div>

              {/* Weights Pricing (full width) */}
              {weightsPricing.length > 0 && (
                <div className="md:col-span-2 w-full mt-4">
                  <h3 className="text-sm font-semibold mb-2">
                    Weights Pricing
                  </h3>
                  <div className="grid grid-cols-4 gap-2 text-xs font-semibold mb-1">
                    <span>Weight</span>
                    <span>Price</span>
                    <span>Strike Price</span>
                    <span>Quantity</span>
                  </div>
                  {weightsPricing.map((row, index) => (
                    <div
                      key={row.weight}
                      className="grid grid-cols-4 gap-2 mb-2"
                    >
                      <span className="flex items-center text-xs">
                        {row.weight}
                      </span>
                      <input
                        type="number"
                        value={row.price}
                        onChange={(e) =>
                          handlePricingChange(index, "price", e.target.value)
                        }
                        className="border p-1 text-xs rounded"
                      />
                      <input
                        type="number"
                        value={row.strike_price}
                        onChange={(e) =>
                          handlePricingChange(
                            index,
                            "strike_price",
                            e.target.value
                          )
                        }
                        className="border p-1 text-xs rounded"
                      />
                      <input
                        type="number"
                        value={row.quantity}
                        onChange={(e) =>
                          handlePricingChange(index, "quantity", e.target.value)
                        }
                        className="border p-1 text-xs rounded"
                      />
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            /* --- Simple Variant Flow (toggle OFF) --- */
            <>
              {/* Name */}
              <div>
                <label>Name</label>
                <input
                  className="w-full border border-gray-200 rounded p-2"
                  type="text"
                  placeholder="Name"
                  // defaultValue={data?.name}
                  value={variant?.name || ""}
                  onChange={(e) =>
                    setVariant({ ...variant, name: e.target.value })
                  }
                />
              </div>
              {/* Price */}
              <div>
                <label>Price</label>
                <input
                  className="w-full border border-gray-200 rounded p-2"
                  type="number"
                  placeholder="Price"
                  value={variant.price || ""}
                  onChange={(e) =>
                    setVariant({ ...variant, price: e.target.value })
                  }
                />
              </div>

              {/* Strike Price */}
              <div>
                <label>Strike Price</label>
                <input
                  className="w-full border border-gray-200 rounded p-2"
                  type="number"
                  placeholder="Strike Price"
                  value={variant.strike_price || ""}
                  onChange={(e) =>
                    setVariant({ ...variant, strike_price: e.target.value })
                  }
                />
              </div>

              {/* Quantity */}
              <div>
                <label>Quantity</label>
                <input
                  className="w-full border border-gray-200 rounded p-2"
                  type="number"
                  placeholder="Quantity"
                  value={variant.quantity || ""}
                  onChange={(e) =>
                    setVariant({ ...variant, quantity: e.target.value })
                  }
                />
              </div>
            </>
          )}
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

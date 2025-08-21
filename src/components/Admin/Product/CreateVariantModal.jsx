import { useState } from "react";
import { state } from "../../../data/state";
import { createBulkPrice, createVariant } from "../../../utils/productsAPI";
import { useSnapshot } from "valtio";
import { SuccessAlert } from "../../Toast";
import SimpleModal from "../Modals/SimpleModal";
import Multiselect from "multiselect-react-dropdown";
// import ProductInputMedia from "../UI/Inputs/ProductInputMedia";
// import { resizeFile, uploadImage } from "../../../utils/const_API";

const CreateVariantModal = () => {
  let snap = useSnapshot(state);
  let id = snap.selectedVariantID;
  console.log("id: ---", id);

  const [createdVariantID, setCreatedVariantID] = useState("");
  const [useAttributes, setUseAttributes] = useState(false);

  // const [addBulkPrice, setAddBulkPrice] = useState(false);
  // const [variantThumbnail, setVariantThumbnail] = useState(null);
  // const [selectedVariantGallery, setSelectedVariantGallery] = useState([]);
  // const [variantGallery, setVariantGallery] = useState([]);

  let [vData, setvData] = useState({
    name: "",
    flavour: "",
    weights: null,
    price: null,
    strike_price: null,
    premium_price: null,
    quantity: null,
    ProductId: id,
  });
  const weights = [
    { label: "500gm", value: "500gm" },
    { label: "1kg", value: "1kg" },
    { label: "2kg", value: "2kg" },
    { label: "3kg", value: "3kg" },
    { label: "4kg", value: "4kg" },
    { label: "5kg", value: "5kg" },
  ];
  const [selectedWeights, setSelectedWeights] = useState([]);
  const [weightsPricing, setWeightsPricing] = useState([]);
  const [bulk_pricings] = useState([]);

  const handleWeightChange = (selectedList) => {
    const newWeights = selectedList.map((item) => item.value);
    setSelectedWeights(newWeights);

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
            booking_price: null,
            premium_price: null,
          }
        );
      });
    });
  };
  // const [from, setFrom] = useState(null);
  // const [to, setTo] = useState(null);
  // const [price, setPrice] = useState(null);
  // const [premiumPrice, setPremiumPrice] = useState(null);

  // const adddBulkPricingHandler = () => {
  //   let data = { from, to, price, premiumPrice };

  //   if ((from, to, data?.price)) {
  //     bulk_pricings.push(data);
  //     setFrom("");
  //     setTo("");
  //     setPrice("");
  //     setPremiumPrice("");
  //   }
  // };

  // const variantGalleryImageHandler = async (e) => {
  //   const file = e.target.files;
  //   let galleryList = [];
  //   const filesArray = Array.from(file);
  //   setSelectedVariantGallery([...selectedVariantGallery, ...filesArray]);

  //   Object.keys(file).forEach(async (key) => {
  //     const image = await resizeFile(file[key]);
  //     galleryList.push(image);
  //     setVariantGallery([...variantGallery, ...galleryList]);
  //   });
  // };

  // const removeVariantGalleryImage = (index) => {
  //   setVariantGallery(variantGallery?.filter((item, i) => i !== index));
  // };

  const createVariantHandler = async () => {
    closeModalHandler();

    // let finalData = {
    //   ProductId: vData.ProductId,
    //   name: vData.flavour,
    //   premium_price: Number(vData.price),
    //   price: Number(vData.price),
    //   quantity: Number(vData.quantity),
    //   strike_price: Number(vData.strike_price),
    // };

    let finalData = {
      ProductId: vData.ProductId,
      // ThumbnailId: vData.ThumbnailId || null,
      // gallery: vData.gallery || [],

      // Attributes
      primary: useAttributes
        ? {
            name: "Flavour",
            values: {
              value: vData.flavour || null,
              hex_code: "",
            },
          }
        : undefined,

      secondary: useAttributes
        ? {
            name: "Weights",
            values: {
              value: selectedWeights || [],
              hex_code: "",
            },
          }
        : undefined,

      weights_pricing: useAttributes ? weightsPricing : [],
    };

    // Conditionally add name/price/strike/quantity only when attributes are OFF
    if (!useAttributes) {
      Object.assign(finalData, {
        name: vData.name,
        price: Number(vData.price || 0),
        strike_price: Number(vData.strike_price || 0),
        premium_price: Number(vData.premium_price || 0),
        quantity: Number(vData.quantity || 0),
      });
    }

    console.log(finalData);

    // if (variantThumbnail !== null) {
    //   let formdata = new FormData();
    //   formdata.append("file", variantThumbnail);
    //   let res = await uploadImage(formdata);
    //   if (res?.status === 200) {
    //     Object.assign(finalData, { ThumbnailId: res?.data[0]?.id });
    //     if (variantGallery?.length > 0) {
    //       for (let i = 0; i < variantGallery?.length; i++) {
    //         let variantGalleryFormdata = new FormData();
    //         variantGallery?.map((image) =>
    //           variantGalleryFormdata?.append("file", image)
    //         );
    //         let res2 = await uploadImage(variantGalleryFormdata);
    //         if (res2?.status === 200) {
    //           Object.assign(finalData, {
    //             gallery: res2?.data?.map((id) => id?.id),
    //           });
    //           let finalResponse = await createVariant(finalData);
    //           if (finalResponse?.status === 200) {
    //             setCreatedVariantID(finalResponse?.data?.data?.id);
    //             state.refreshEditProductComponent = true;
    //             SuccessAlert("Variant Created");
    //           }
    //         }
    //       }
    //     } else {
    //       let finalResponse = await createVariant(finalData);
    //       if (finalResponse?.status === 200) {
    //         setCreatedVariantID(finalResponse?.data?.data?.id);
    //         state.refreshEditProductComponent = true;
    //         SuccessAlert("Variant Created");
    //       }
    //     }
    //   }
    // } else {
    let finalResponse = await createVariant(finalData);
    if (finalResponse?.status === 200) {
      setCreatedVariantID(finalResponse?.data?.data?.id);
      state.refreshEditProductComponent = true;
      SuccessAlert("Variant Created");
    }
    // }
    if (bulk_pricings?.length > 0) {
      bulk_pricings?.forEach((vId) => {
        vId["VariantId"] = createdVariantID;
      });
      await Promise.all(
        bulk_pricings?.map(async (dataObject) => {
          const response = await createBulkPrice(dataObject);
          return response.data?.data?.id;
        })
      );
      SuccessAlert("Variant Created");
    }
  };

  const closeModalHandler = () => {
    state.createVariantModal = false;
  };
  const handlePricingChange = (index, field, value) => {
    const newPricing = [...weightsPricing];
    newPricing[index][field] = value;
    setWeightsPricing(newPricing);
  };

  return (
    <SimpleModal modalSize={"max-w-3xl"} closeModalHandler={closeModalHandler}>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-2">
          {/* Toggle */}
          <div className="md:col-span-2 flex items-center space-x-2 mb-2">
            <input
              type="checkbox"
              checked={useAttributes}
              onChange={(e) => setUseAttributes(e.target.checked)}
            />
            <label className="text-sm font-medium">
              Enable Flavour & Weights
            </label>
          </div>

          {/* -------- Simple Variant (No Attributes) -------- */}
          {!useAttributes && (
            <>
              {/* Name */}
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  className="w-full border border-gray-200 rounded text-sm p-2"
                  type="text"
                  placeholder="Name"
                  onChange={(e) => setvData({ ...vData, name: e.target.value })}
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium">Price</label>
                <input
                  className="w-full border border-gray-200 rounded text-sm p-2"
                  type="number"
                  placeholder="Price"
                  min="0"
                  onChange={(e) =>
                    setvData({ ...vData, price: e.target.value })
                  }
                />
              </div>

              {/* Strike Price */}
              <div>
                <label className="block text-sm font-medium">
                  Strike Price
                </label>
                <input
                  className="w-full border border-gray-200 rounded text-sm p-2"
                  type="number"
                  placeholder="Strike Price"
                  min="0"
                  onChange={(e) =>
                    setvData({ ...vData, strike_price: e.target.value })
                  }
                />
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium">Quantity</label>
                <input
                  className="w-full border border-gray-200 rounded text-sm p-2"
                  type="number"
                  placeholder="Quantity"
                  min="0"
                  onChange={(e) =>
                    setvData({ ...vData, quantity: e.target.value })
                  }
                />
              </div>
            </>
          )}

          {/* -------- Variant with Attributes (Flavour + Weights) -------- */}
          {useAttributes && (
            <>
              {/* Flavour */}
              <div>
                <label className="block text-sm font-medium">Flavour</label>
                <input
                  className="w-full border border-gray-200 rounded text-sm p-2"
                  type="text"
                  placeholder="Flavour"
                  onChange={(e) =>
                    setvData({ ...vData, flavour: e.target.value })
                  }
                />
              </div>

              {/* Weights */}
              <div>
                <label className="block text-sm font-medium">Weights</label>
                <Multiselect
                  options={weights}
                  onSelect={handleWeightChange}
                  onRemove={handleWeightChange}
                  displayValue="label"
                  placeholder="Select Weights"
                  style={{
                    chips: { fontSize: "12px" },
                    multiselectContainer: { fontSize: "12px" },
                    searchBox: { fontSize: "12px", padding: "2px 8px" },
                    option: { fontSize: "12px", padding: "3px 8px" },
                    inputField: {
                      fontSize: "12px",
                      padding: "3px 8px",
                      width: "100%",
                    },
                  }}
                />
              </div>
            </>
          )}

          {/* -------- Weights Pricing -------- */}
          {useAttributes && weightsPricing.length > 0 && (
            <div className="md:col-span-2 w-full mt-4">
              <h3 className="text-sm font-semibold mb-2">Weights Pricing</h3>
              <div className="grid grid-cols-4 gap-2 text-xs font-semibold mb-1">
                <span>Weight</span>
                <span>Price</span>
                <span>Strike Price</span>
                <span>Quantity</span>
              </div>
              {weightsPricing.map((row, index) => (
                <div key={row.weight} className="grid grid-cols-4 gap-2 mb-2">
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
                      handlePricingChange(index, "strike_price", e.target.value)
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
        </div>

        {/* <div className="w-full flex items-start gap-4 ">
          <div className="w-full ">
            <ProductInputMedia
              label={"Thumbnail"}
              image={variantThumbnail}
              setImage={setVariantThumbnail}
            />
          </div>
          <div className="w-full mt-8">
            <input
              className="focus:outline-none cursor-pointer"
              type="file"
              multiple
              onChange={(e) => variantGalleryImageHandler(e)}
            />
            <div className="mt-4 w-full gap-4 overflow-x-auto flex-nowrap grid grid-cols-3">
              {variantGallery?.map((image, i) => (
                <div key={i} className=" flex flex-col items-center ">
                  <img
                    src={URL.createObjectURL(image)}
                    className="h-[50px] w-full rounded-md object-cover"
                  />
                  <div
                    onClick={() => removeVariantGalleryImage(i)}
                    className="pt-1 font-semibold w-full text-center text-red-600 cursor-pointer"
                  >
                    Remove
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div> */}

        {/* Variant List */}

        {/* <div className="mt-4 row align-items-center">
          <div className="flex gap-2 items-center">
            <span>Do you want to add bulk pricing?</span>
            <input
              className=""
              type="checkbox"
              id="flexSwitchCheckDefault"
              value={addBulkPrice}
              onChange={() => setAddBulkPrice(!addBulkPrice)}
              checked={addBulkPrice ? "checked" : ""}
            />
          </div>
        </div> */}

        {/* {addBulkPrice ? (
          <div className="w-full my-4">
            <div className="w-full flex items-center gap-4">
              <div className="w-full">
                <label htmlFor="">From</label>
                <input
                  className=" text-xs border-gray-200 "
                  type="text"
                  placeholder="From"
                  value={from}
                  onChange={(e) => {
                    setFrom(e.target.value);
                  }}
                />
              </div>
              <div className="w-full">
                <label htmlFor="">To</label>
                <input
                  className=" text-xs border-gray-200 "
                  type="text"
                  placeholder="To"
                  value={to}
                  onChange={(e) => {
                    setTo(e.target.value);
                  }}
                />
              </div>
              <div className="w-full">
                <label htmlFor="">Price</label>
                <input
                  className="text-xs border-gray-200 "
                  type="number"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />
              </div>
              <div className="w-full">
                <label htmlFor="">Premium Price</label>
                <input
                  className="text-xs border-gray-200 "
                  type="number"
                  placeholder="Premium Price"
                  value={premiumPrice}
                  onChange={(e) => {
                    setPremiumPrice(e.target.value);
                  }}
                />
              </div>

              <div className="mt-4">
                <p
                  className="px-2 bg-[#222222] text-white rounded-sm text-md cursor-pointer hover:scale-110 transition duration-150"
                  onClick={adddBulkPricingHandler}
                >
                  +
                </p>
              </div>
            </div>
            {bulk_pricings?.length > 0 ? (
              <div className="mt-2 flex items-start justify-start">
                <table className="table-fixed w-full text-center">
                  <thead>
                    <tr>
                      <th>From</th>
                      <th>To</th>
                      <th>Price</th>
                      <th>Premium Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bulk_pricings?.map((data, i) => (
                      <tr key={i}>
                        <td>{data?.from}</td>
                        <td>{data?.to}</td>
                        <td>
                          {"₹"} {data?.price}
                        </td>
                        <td>
                          {"₹"} {data?.premiumPrice}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              ""
            )}
          </div>
        ) : null} */}

        {/* updated button */}
        <div className="w-full flex items-center justify-end gap-2 mt-4">
          <span
            className="p-2 text-sm bg-[#222222] rounded-md text-white transition-all duration-500 cursor-pointer"
            onClick={createVariantHandler}
          >
            Create
          </span>
        </div>
      </div>
    </SimpleModal>
  );
};

export default CreateVariantModal;

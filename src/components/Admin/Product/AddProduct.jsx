import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useRef, useState } from "react";
import { state } from "../../../data/state.js";
import { FailureAlert, SuccessAlert } from "../../Toast.jsx";
import { uploadImage } from "../../../utils/const_API.js";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import InputCompState from "../UI/Inputs/InputCompState.jsx";
import { IoMdArrowRoundBack } from "react-icons/io";
import InputComp from "../UI/Inputs/InputComp.jsx";
import { BsPlus } from "react-icons/bs";
import { TBody, TD, TH, THead, TR, XTable } from "../UI/Table/XTable.jsx";
import { useSnapshot } from "valtio";
import ProductInputMedia from "../UI/Inputs/ProductInputMedia.jsx";
import { createProduct } from "../../../utils/productsAPI.js";
import {
  getCategories,
  getSubCategoryListing,
} from "../../../utils/categoryAPI.js";
import JoditEditor from "jodit-react";
import CheckTabInput from "../UI/Inputs/CheckTabInput.jsx";
import { getCollections } from "../../../utils/collectionsAPI.js";
import { AddButton } from "../UI/Buttons/AddButton.jsx";
import RatingInput from "../UI/Inputs/RatingInput.jsx";
import OutletWrapper from "../../../Pages/OutletWrapper.jsx";

const schema = yup.object({
  name: yup.string(),
  yt_video_link: yup.string(),
});

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const editor = useRef(null);

  const [isCodAllowed, setIsCodAllowed] = useState(true);
  const [show_Price, setShowPrice] = useState(true);
  const [enquiry, setEnquiry] = useState(true);
  const [product_return, setProductReturn] = useState(false);

  const [category, setCategory] = useState([]);
  const [showCat, setShowCat] = useState([]);
  const [subCategory, setSubCategories] = useState();
  const [showSubCat, setShowSubCat] = useState([]);

  const [shipping, setShipping] = useState("FREE_SHIPPING");
  const [shippingPrice, setShippingPrice] = useState(null);

  const [variants, setVariants] = useState("");
  const [price, setPrice] = useState("");
  const [variantList, setVariantList] = useState([]);

  const [quantity, setQuantity] = useState("");
  const [strikePrice, setStrikePrice] = useState("");
  // const [premiumPrice, setPremiumPrice] = useState("");

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [rangePrice, setRangePrice] = useState("");
  // const [bPremiumPrice, setBPremiumPrice] = useState("");

  const [pricingType, setPricingType] = useState(false);

  const [desc, setDesc] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [gallery, setGallery] = useState([]);

  // const [variantThumbnail, setVariantThumbnail] = useState(null);
  // const [selectedVariantGallery, setSelectedVariantGallery] = useState([]);
  // const [variantGallery, setVariantGallery] = useState([]);

  const [rating, setRating] = useState(1);
  // const [tags, setTags] = useState([]);
  // const [inputValue, setInputValue] = useState("");

  const [collections, setCollections] = useState([]);
  const [collectionId, setCollectionsId] = useState();

  const [returnDays, setReturnDays] = useState(7);

  const snap = useSnapshot(state);
  const naviagte = useNavigate();

  const getCollection = async () => {
    const res = await getCollections();
    setCollections(res?.data?.data);
  };

  useEffect(() => {
    getCollection();
  }, []);

  const getCategory = async () => {
    const res = await getCategories();
    setShowCat(res?.data?.data);
  };

  useEffect(() => {
    getCategory();
  }, []);

  const categoryChangeHandler = (value) => {
    setCategory(value);
  };

  const getSubCategory = async (category) => {
    try {
      let res = await getSubCategoryListing(category);

      if (res?.status === 200) {
        setShowSubCat(res?.data?.data?.subCategories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSubCategory(category);
  }, [category]);

  const subCatChangehandler = (value) => {
    setSubCategories(value);
  };

  // tags start
  // const handleInputChange = (e) => {
  //   setInputValue(e.target.value);
  // };

  // const handleInputKeyPress = () => {
  //   setTags([...tags, inputValue?.trim()]);
  //   setInputValue("");
  // };

  // const handleTagRemove = (tagToRemove) => {
  //   setTags(tags?.filter((tag) => tag !== tagToRemove));
  // };
  // tags end

  const galleryImageHandler = async (e) => {
    const file = e.target.files;
    let galleryList = [];
    const filesArray = Array.from(file);
    setSelectedImages([...selectedImages, ...filesArray]);
    if (snap.galleryImageLimit > file?.length) {
      Object.keys(file)?.forEach(async (key) => {
        // const image = await resizeFile(file[key]);
        galleryList?.push(file[key]);
        setGallery([...gallery, ...galleryList]);
      });
    } else {
      FailureAlert(`You can't add more then ${snap.galleryImageLimit} images`);
    }
  };

  const removeGalleryImage = (index) => {
    setGallery(gallery?.filter((item, i) => i !== index));
  };

  // const variantGalleryImageHandler = async (e) => {
  //   const file = e.target.files;
  //   let galleryList = [];
  //   const filesArray = Array.from(file);
  //   setSelectedVariantGallery([...selectedVariantGallery, ...filesArray]);
  //   if (snap.galleryImageLimit > file?.length) {
  //     Object.keys(file).forEach(async (key) => {
  //       const image = await resizeFile(file[key]);
  //       galleryList.push(image);
  //       setVariantGallery([...variantGallery, ...galleryList]);
  //     });
  //   } else {
  //     FailureAlert(`You can't add more then ${snap.galleryImageLimit} images`);
  //   }
  // };

  // const removeVariantGalleryImage = (index) => {
  //   setVariantGallery(variantGallery?.filter((item, i) => i !== index));
  // };

  const addVariantHandler = async () => {
    const data = {
      name: variants,
      price,
      bulk_pricing: [],
      strike_price: strikePrice,
      quantity,
    };

    if (data?.name && data?.quantity && data?.price && data?.strike_price) {
      // if (variantThumbnail !== null) {

      //   let formdata = new FormData();
      //   formdata.append("file", variantThumbnail);
      //   let res = await uploadImage(formdata);
      //   if (res?.status === 200) {
      //     Object.assign(data, { ThumbnailId: res?.data[0]?.id });
      //     if (variantGallery?.length > 0) {
      //       for (let i = 0; i < variantGallery?.length; i++) {
      //         let variantGalleryFormdata = new FormData();
      //         variantGallery?.map((image) =>
      //           variantGalleryFormdata?.append("file", image)
      //         );
      //         let res2 = await uploadImage(variantGalleryFormdata);
      //         if (res2?.status === 200) {
      //           Object.assign(data, {
      //             gallery: res2?.data?.map((id) => id?.id),
      //           });
      //           SuccessAlert("Variant Added");
      //         }
      //       }
      //     }
      //     setVariantList((vp) => [...vp, data]);
      //     setVariants("");
      //     setPrice("");
      //     setStrikePrice("");
      //     setPremiumPrice("");
      //     setQuantity("");
      //     // setVariantGallery(null);
      //   }

      // } else {
      //   setVariantList((vp) => [...vp, data]);
      //   setVariants("");
      //   setPrice("");
      //   setStrikePrice("");
      //   setPremiumPrice("");
      //   setQuantity("");
      //   setVariantGallery(null);
      //   setVariantThumbnail(null);
      // }

      setVariantList((vp) => [...vp, data]);
      setVariants("");
      setPrice("");
      setStrikePrice("");
      // setPremiumPrice("");
      setQuantity("");
    }
  };

  const addBulkPricingHandler = (variantName, index) => {
    let data = {
      to,
      from,
      price: rangePrice,
    };
    if ((variantName, from, index, to, data?.price)) {
      var vList = variantList;
      vList?.map((vItem, index) => {
        if (vItem?.name === variantName) {
          vList[index]?.bulk_pricing?.push(data);
          delete variantList?.bulk_pricing?.index;
        }
      });
      console.log(vList);
      setVariantList(vList);
      setTo("");
      setFrom("");
      setRangePrice("");
    }
  };

  const deleteVariantHandler = (index) => {
    setVariantList(variantList.filter((item, i) => i !== index));
  };

  const shippingTypeOptions = [
    {
      name: "FREE_SHIPPING",
    },
    {
      name: "SHIPPING_PRICE",
    },
    {
      name: "SHIPPING_PERCENTAGE",
    },
  ];

  const shippingTypeHandler = (value) => {
    setShipping(value);
  };

  const prodSubmitHandler = async (data) => {
    const checkFields = () => {
      if (!variantList?.length) return "Please add at least one variant.";
      if (!category?.length) return "Please select a category.";
      if (!shipping) return "Please select a shipping method.";
      if (!thumbnail) return "Please upload a thumbnail image.";
      if (!desc) return "Please add a product description.";
      if (!rating) return "Please provide a product rating.";
      return null;
    };

    const errorMessage = checkFields();

    if (errorMessage) {
      FailureAlert(errorMessage);
      return;
    }

    if (
      variantList?.length > 0 &&
      category?.length > 0 &&
      shipping &&
      thumbnail &&
      desc &&
      rating
    ) {
      const productData = {
        ...data,
        variants: variantList,
        // tags,
        gallery,
        description: desc,
        CategoryId: category,
        SubCategoryId: subCategory,
        shipping_value: shippingPrice || 0,
        shipping_value_type: shipping,
        cod_enabled: isCodAllowed,
        is_active: true,
        enquiry_enabled: enquiry,
        show_price: show_Price,
        product_return,
        rating,
        CollectionId: collectionId,
        // reviews,
      };

      state.isLoading = true;
      try {
        const formData = new FormData();
        formData.append("file", thumbnail);
        const thumbnailRes = await uploadImage(formData);

        if (thumbnailRes?.status === 200) {
          productData.ThumbnailId = thumbnailRes.data[0].id;
          if (gallery?.length > 0) {
            const galleryPromises = gallery?.map((image) => {
              const galleryFormData = new FormData();
              galleryFormData.append("file", image);
              return uploadImage(galleryFormData);
            });

            const galleryRes = await Promise.all(galleryPromises);

            productData.gallery = galleryRes
              .filter((res) => res?.status === 200)
              .flatMap((res) => res?.data?.map((item) => item.id));
          }

          delete productData?.variantList;
          if (productData?.SubCategoryId === "" || null) {
            delete productData?.SubCategoryId;
          }
          if (productData?.yt_video_link === "" || null) {
            delete productData?.yt_video_link;
          }

          // console.log(productData);

          const res3 = await createProduct(productData);

          if (res3?.status === 200) {
            SuccessAlert("Product created");
            state.refreshProductList = true;
            naviagte("/products");
          }
        }
        state.isLoading = false;
      } catch (error) {
        console.log(error);
        FailureAlert("Somthing went wrong");
      }
    } else {
      FailureAlert("Please Fill or Select All The Required Fields");
    }
    state.isLoading = false;
  };

  return (
    <OutletWrapper>
      <form className="w-full " onSubmit={handleSubmit(prodSubmitHandler)}>
        <div className="w-full flex items-center justify-between ">
          <div className="flex items-center gap-4">
            <IoMdArrowRoundBack
              className="hover:scale-125 transition-all duration-500 cursor-pointer text-2xl"
              onClick={() => naviagte(-1)}
            />
            <span className="text-xl font-semibold">Add new Product</span>
          </div>
          <AddButton text={"Submit"} />
        </div>

        <div className="w-full flex flex-col gap-4 mt-4">
          {/* PRODUCT & GENERAL INFORMATION */}
          <div className="w-full grid lg:grid-cols-2 gap-4">
            {/* PRODUCT INFORMATION */}
            <div className="w-full p-3 rounded-xl border">
              <div className="text-lg font-semibold">
                <h5>Product Information</h5>
              </div>

              <div className="mt-8 flex flex-col gap-4 ">
                <InputComp
                  size={"w-full flex flex-col gap-0.5"}
                  label={"Product Name"}
                  register={register}
                  registerValue={"name"}
                  require={true}
                  errors={errors.name?.message}
                />

                <div className=" w-full grid grid-cols-2 gap-4 ">
                  <div className="w-full flex flex-col gap-0.5">
                    <label>
                      Category<span className="text-red-500">*</span>
                    </label>
                    <select
                      className=" border-gray-200 rounded"
                      name="state"
                      onChange={(e) => categoryChangeHandler(e.target.value)}
                    >
                      <option selected hidden>
                        Select Category
                      </option>
                      {showCat?.map((cat) => (
                        <option value={cat?.id} key={cat?.id}>
                          {cat?.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="w-full flex flex-col gap-0.5">
                    <label>Sub Category</label>
                    <select
                      className=" border-gray-200 rounded"
                      name="state"
                      onChange={(e) => subCatChangehandler(e.target.value)}
                    >
                      {showSubCat?.length > 0 ? (
                        <>
                          <option selected hidden>
                            Select Category
                          </option>
                          {showSubCat?.map((cat) => (
                            <option value={cat?.id} key={cat?.id}>
                              {cat?.name}
                            </option>
                          ))}
                        </>
                      ) : (
                        <option selected disabled>
                          No sub-category Found
                        </option>
                      )}
                    </select>
                  </div>
                </div>

                <div className="w-full flex flex-col gap-0.5">
                  <label>Collection</label>
                  <select
                    className=" border-gray-200 rounded"
                    onChange={(e) => setCollectionsId(e.target.value)}
                  >
                    <option selected disabled>
                      Select Collection
                    </option>
                    {collections?.map((coll) => (
                      <option value={coll?.id} key={coll?.id}>
                        {coll?.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="w-full flex flex-col gap-0.5">
                  <label>
                    Description<span className="text-red-500">*</span>
                  </label>
                  <div className="w-full">
                    <JoditEditor
                      ref={editor}
                      value={desc}
                      onChange={(e) => setDesc(e)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* GENERAL INFORMATION */}
            <div className="p-3 rounded-xl w-full border">
              <div className="text-lg font-semibold">
                <h5>General Information</h5>
              </div>

              <div className="mt-8 flex flex-col gap-4">
                <div className="w-full flex gap-4">
                  {/* Shipping type */}
                  <div className="w-full flex items-center gap-4">
                    <div className="w-full flex flex-col gap-0.5">
                      <label>
                        Shipping Type<span className="text-red-500">*</span>
                      </label>
                      <select
                        className=" border-gray-200 rounded"
                        onChange={(e) => shippingTypeHandler(e.target.value)}
                      >
                        <option selected disabled hidden>
                          Select Shipping Type
                        </option>
                        {shippingTypeOptions?.map((ship, i) => (
                          <option value={ship?.name} key={i}>
                            {ship.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    {shipping !== "FREE_SHIPPING" && (
                      <InputCompState
                        size={"w-full flex flex-col gap-0.5"}
                        label={
                          shipping === "SHIPPING_PRICE"
                            ? "Shipping Price"
                            : "Shipping Percentage"
                        }
                        type={"number"}
                        value={shippingPrice}
                        setValue={setShippingPrice}
                      />
                    )}
                  </div>
                </div>
                <div className="w-full grid grid-cols-2 gap-4">
                  <InputComp
                    type={"url"}
                    size={"w-full flex flex-col gap-0.5"}
                    label={"Video Link"}
                    register={register}
                    registerValue={"yt_video_link"}
                    require={false}
                  />
                  <RatingInput
                    size={"w-full flex flex-col gap-0.5"}
                    label={"Rating"}
                    value={rating}
                    setValue={setRating}
                    type={"number"}
                    required
                  />
                </div>

                {/* <div className="w-full flex flex-col gap-2">
                  <div className="w-full flex items-center gap-2">
                    <div className="w-full">
                      <label>Tags</label>
                      <input
                        className="form-control border-gray-200 rounded placeholder:opacity-70"
                        type={"text"}
                        placeholder={"Tags"}
                        value={inputValue}
                        onChange={(e) => handleInputChange(e)}
                      />
                    </div>
                    <div
                      className="mt-4 flex items-center px-2 py-1 bg-[#222222] text-white rounded text-xs cursor-pointer hover:scale-95 transition duration-150"
                      onClick={handleInputKeyPress}
                    >
                      Add
                      <BsPlus className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="w-full grid grid-cols-5 gap-2">
                    {tags?.map((tag, index) => (
                      <div
                        key={index}
                        className="w-full flex items-center justify-between gap-2 bg-indigo-100 text-indigo-800  px-2.5 py-0.5 rounded"
                      >
                        <span className="text-sm">{tag}</span>
                        <button onClick={() => handleTagRemove(tag)}>
                          <RxCross2 className="h-4 w-4 text-red-500" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div> */}

                <div className="w-full grid grid-cols-3 items-start gap-4 mt-8">
                  <CheckTabInput
                    value={isCodAllowed}
                    setValue={setIsCodAllowed}
                    label={"COD Availability :"}
                    position={"justify-start"}
                  />
                  {/* <CheckTabInput
                    value={isActive}
                    setValue={setIsActive}
                    label={"Display : "}
                    position={"justify-start"}
                  /> */}
                  <CheckTabInput
                    value={show_Price}
                    setValue={setShowPrice}
                    label={"Show Price : "}
                    position={"justify-start"}
                  />
                  <CheckTabInput
                    value={enquiry}
                    setValue={setEnquiry}
                    label={"Enquiry : "}
                    position={"justify-start"}
                  />
                </div>

                <div className="w-full flex items-center justify-start gap-4 mt-4">
                  <CheckTabInput
                    value={product_return}
                    setValue={setProductReturn}
                    label={"Returnable : "}
                  />
                  {product_return && (
                    <InputCompState
                      size={" flex flex-col gap-0.5"}
                      label={"Days"}
                      value={returnDays}
                      setValue={setReturnDays}
                      required={true}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/*VARIANT & IMAGES */}
          <div className="w-full grid lg:grid-cols-2 gap-4">
            {/* VARIANTS */}
            <div className="p-3 rounded-xl w-full border">
              <div className="text-lg font-semibold">
                <span>Variants</span>
              </div>
              <div>
                <div className="w-full flex items-center justify-end">
                  <div
                    className="flex items-center px-2 py-1 bg-[#222222] text-white rounded text-xs cursor-pointer hover:scale-95 transition duration-150"
                    onClick={addVariantHandler}
                  >
                    Add
                    <BsPlus className="h-5 w-5" />
                  </div>
                </div>
                <div className="w-full flex items-center flex-col gap-2 my-2">
                  <div className="w-full grid grid-cols-2 gap-4">
                    <InputCompState
                      label={"Name"}
                      value={variants}
                      setValue={setVariants}
                      required={true}
                    />
                    <InputCompState
                      label={"Quantity"}
                      value={quantity}
                      setValue={setQuantity}
                      type={"number"}
                      required={true}
                    />
                  </div>
                  <div className="w-full grid grid-cols-2 lg:grid-cols-2 gap-2 my-2">
                    <InputCompState
                      label={"Price"}
                      value={price}
                      setValue={setPrice}
                      type={"number"}
                      required={true}
                    />
                    <InputCompState
                      label={"Strike Price"}
                      value={strikePrice}
                      setValue={setStrikePrice}
                      type={"number"}
                      required={true}
                    />
                    {/* <InputCompState
                      label={"Premium Price"}
                      value={premiumPrice}
                      setValue={setPremiumPrice}
                      type={"number"}
                      required={false}
                    /> */}
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
                </div>

                {variantList?.length > 0 && (
                  <div className="w-full flex items-start justify-start">
                    <XTable>
                      <THead>
                        <TR>
                          <TH size={"text-xs"}>Name</TH>
                          <TH size={"text-xs"}>Quantity</TH>
                          <TH size={"text-xs"}>Price</TH>
                          <TH size={"text-xs"}>Strike Price</TH>
                          <TH size={"text-xs"}></TH>
                        </TR>
                      </THead>
                      <TBody>
                        {variantList?.map((data, i) => {
                          return (
                            <TR key={i}>
                              <TD>{data?.name}</TD>
                              <TD>{data?.quantity}</TD>
                              <TD>
                                {"₹"} {data?.price}
                              </TD>

                              <TD>
                                {"₹"} {data?.strike_price}
                              </TD>
                              <TD className="flex items-center gap-2 justify-center">
                                <AiFillDelete
                                  className="text-red-500  cursor-pointer"
                                  onClick={() => deleteVariantHandler(i)}
                                />
                              </TD>
                            </TR>
                          );
                        })}
                      </TBody>
                    </XTable>
                  </div>
                )}
              </div>

              {variantList?.length > 0 && (
                <div className="mb-4 flex items-center mt-3">
                  <div className="flex gap-2 items-center">
                    <span>Do you want to add bulk pricing?</span>
                    <input
                      type="checkbox"
                      value={pricingType}
                      onChange={() => setPricingType(!pricingType)}
                      checked={pricingType ? "checked" : ""}
                    />
                  </div>
                </div>
              )}
              {pricingType
                ? variantList?.map((data, i) => (
                    <div
                      className="w-full flex items-start flex-col mb-8"
                      key={i}
                    >
                      <div className="w-full flex items-center gap-3">
                        <div className="w-full flex flex-col gap-0.5">
                          <label>Variant</label>
                          <input
                            className="w-full border-gray-200 rounded"
                            type="text"
                            value={data?.name}
                            disabled
                          />
                        </div>
                        <div className="w-full flex flex-col gap-0.5">
                          <label>From</label>
                          <input
                            className="w-full border-gray-200 rounded"
                            type="number"
                            placeholder="From"
                            onChange={(e) => {
                              setFrom(e.target.value);
                            }}
                          />
                        </div>
                        <div className="w-full flex flex-col gap-0.5">
                          <label>To</label>
                          <input
                            className="w-full border-gray-200 rounded"
                            type="number"
                            placeholder="To"
                            onChange={(e) => {
                              setTo(e.target.value);
                            }}
                          />
                        </div>
                        <div>
                          <label>Price</label>
                          <input
                            className="form-controlw-full border-gray-200 rounded"
                            type="number"
                            placeholder="Price"
                            onChange={(e) => {
                              setRangePrice(e.target.value);
                            }}
                          />
                        </div>

                        <div className="pt-4">
                          <span
                            className="px-2 bg-[#222222] text-white rounded-sm text-md cursor-pointer hover:scale-110 transition duration-150"
                            onClick={() => addBulkPricingHandler(data?.name, i)}
                          >
                            +
                          </span>
                        </div>
                      </div>

                      {data?.bulk_pricing?.length > 0 ? (
                        <div className="w-full mt-2 flex items-start justify-start my-4">
                          <XTable className="w-full text-center">
                            <THead>
                              <TR>
                                <TH>From</TH>
                                <TH>To</TH>
                                <TH>Price</TH>
                                {/* <TH>Premium Price</TH> */}
                              </TR>
                            </THead>
                            <TBody>
                              {data?.bulk_pricing?.map((data, i) => (
                                <TR key={i}>
                                  <TD>{data?.from}</TD>
                                  <TD>{data?.to}</TD>
                                  <TD>
                                    {"₹"} {data?.price}
                                  </TD>
                                  {/* <TD>
                                  {"₹"} {data?.premiumPrice}
                                </TD> */}
                                </TR>
                              ))}
                            </TBody>
                          </XTable>
                        </div>
                      ) : null}
                    </div>
                  ))
                : ""}
            </div>

            {/* IMAGES */}
            <div className="p-3 rounded-xl w-full border">
              <div className="text-lg font-semibold">
                <h5>Product Images</h5>
              </div>

              <div className="w-full flex items-center flex-col gap-4">
                <div className="w-full flex items-center mt-4 gap-4">
                  <ProductInputMedia
                    required={true}
                    label={"Thumbnail"}
                    image={thumbnail}
                    setImage={setThumbnail}
                    recSize={"Max 1mb & Ratio 3 : 2"}
                  />
                </div>

                <div className="w-full flex flex-col">
                  <label className="w-full">Product Images</label>
                  <div className="w-full">
                    <input
                      className="focus:outline-none cursor-pointer"
                      type="file"
                      multiple
                      onChange={(e) => galleryImageHandler(e)}
                    />
                  </div>
                </div>
                <div className="w-full flex items-start gap-2">
                  <div className="w-full gap-4 overflow-x-auto flex-nowrap grid grid-cols-5">
                    {gallery?.map((image, i) => (
                      <div key={i} className=" flex flex-col items-center ">
                        <img
                          src={URL.createObjectURL(image)}
                          alt="Image"
                          width={"auto"}
                          height={"auto"}
                          className="h-[100px] w-full rounded-md object-cover"
                        />
                        <div
                          onClick={() => removeGalleryImage(i)}
                          className="pt-1 font-semibold w-full text-center text-red-600 cursor-pointer"
                        >
                          Remove
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </OutletWrapper>
  );
};

export default AddProduct;

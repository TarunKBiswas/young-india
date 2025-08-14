/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSnapshot } from "valtio";
import { state } from "../../../data/state.js";
import {
  getCategories,
  getSubCategoryListing,
} from "../../../utils/categoryAPI.js";
import { thankyouModalHandler, uploadImage } from "../../../utils/const_API.js";
import { FailureAlert, SuccessAlert } from "../../Toast.jsx";
import { updateProduct } from "../../../utils/productsAPI.js";
import JoditEditor from "jodit-react";
import { IoMdArrowRoundBack } from "react-icons/io";
import InputComp4 from "../UI/Inputs/InputComp4.jsx";
import DisabledInput from "../UI/Inputs/DisabledInput.jsx";
import { BsPencil, BsTrash } from "react-icons/bs";
import ProductInputMedia from "../UI/Inputs/ProductInputMedia.jsx";
import CheckTabInput from "../UI/Inputs/CheckTabInput.jsx";
import { getCollections } from "../../../utils/collectionsAPI.js";
import { AddButton } from "../UI/Buttons/AddButton.jsx";

const schema = yup.object({
  name: yup.string(),
});

const EditProductForm = ({
  productInfo,
  cod_enabled,
  setIsCodAllowed,
  is_active,
  setIsActive,
  enquiry_enabled,
  setEnquiry,
  show_price,
  setShowPrice,
  product_return,
  setProductReturn,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: productInfo,
  });

  const snap = useSnapshot(state);
  const param = useParams();
  const navigate = useNavigate();
  state.selectedVariantID = param.id;

  // console.log(productInfo);

  const [desc, setDescription] = useState(productInfo?.desc);
  const [shipping, setShipping] = useState(productInfo?.shipping_value_type);
  const [shipping_value, setShipping_value] = useState(0);
  const [category, setCategory] = useState("");
  const [showCategory, setShowCategory] = useState([]);

  const [subCategory, setSubCategory] = useState(null);
  const [showSubCategory, setShowSubCategory] = useState([]);

  const [collections, setCollections] = useState([]);
  const [collectionId, setCollectionsId] = useState(null);

  const [newThumbnail, setNewThumbnail] = useState(null);

  const [gallery, setGallery] = useState([]);
  const [prevGalleryList, setPrevGalleryList] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);

  const [prevVariantList, setPreviousVariantList] = useState(null);

  const [rating, setRating] = useState();
  const [yt_video_link, setYt_video_link] = useState("");

  const [return_days, setReturnDays] = useState("");

  let prevCatID = productInfo?.CategoryId;
  let prevSubCatID = productInfo?.SubCategoryId;
  let prevCollID = productInfo?.CollectionId;
  let prevThumbnailID = productInfo?.ThumbnailId;

  useEffect(() => {
    // console.log(productInfo?.gallery);
    setPrevGalleryList(productInfo?.gallery);
  }, [productInfo?.gallery]);

  useEffect(() => {
    setPreviousVariantList(productInfo?.variants);
  }, [productInfo?.variants, snap.refreshEditProductComponent]);

  const getCollection = async () => {
    const res = await getCollections();

    setCollections(res?.data?.data);
  };

  // CATEGORY AND SUBCATEGORY SECTION
  const getCategory = async () => {
    try {
      const res = await getCategories();
      if (res?.status === 200) {
        setShowCategory(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCollection();
  }, []);

  useEffect(() => {
    getCategory();
  }, [param.id]);

  const categoryChangeHandler = (value) => {
    setCategory(value === prevCatID ? prevCatID : value);
  };

  const getSubCategory = async (category) => {
    try {
      let subCat = await getSubCategoryListing(category || prevCatID);
      if (subCat?.data?.data?.sub_categories) {
        setShowSubCategory(subCat?.data?.data?.subCategories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const subCatChangehandler = (value) => {
    if (value === prevSubCatID) {
      setSubCategory(prevSubCatID);
    } else {
      setSubCategory(value);
    }
  };

  useEffect(() => {
    getSubCategory(category);
  }, [category]);

  const galleryImageHandler = (e) => {
    const file = e.target.files;
    let galleryList = [];
    const filesArray = Array.from(file);
    setSelectedImages([...selectedImages, ...filesArray]);
    if (snap.galleryImageLimit > file?.length) {
      Object.keys(file).forEach(async (key) => {
        // const image = await resizeFile(file[key]);
        const image = file[key];
        galleryList?.push(image);
        setGallery([...gallery, ...galleryList]);
      });
    } else {
      FailureAlert(`You can't add more then ${snap.galleryImageLimit} images`);
    }
  };

  const removeNewGalleryImage = (index) => {
    setGallery(gallery?.filter((_, i) => i !== index));
  };

  const removePrevImageHandler = (id) => {
    let newPrevImageList = prevGalleryList?.filter((img) => img?.id !== id);
    setPrevGalleryList(newPrevImageList);
  };

  // VARIANT SECTION
  const variantInputHandler = () => {
    state.createVariantModal = true;
  };

  const editModalHandler = (id, data) => {
    state.selectedVariantID = id;
    state.editVariantModal = true;
    state.selectedVariantData = data;
  };

  const deletePrevVariantHandler = (id) => {
    state.selectedVariantID = id;
    state.deleteVariantModal = true;
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

  // Final Update
  const updateProductHandler = async (data) => {
    let prevImgList = prevGalleryList?.map((img) => img?.id);
    let catID =
      category === "" || null || undefined ? prevCatID : category || category;
    let subCatID =
      subCategory === null || undefined || ""
        ? prevSubCatID
        : Number(subCategory);
    let collID =
      collectionId === "" || null || undefined
        ? prevCollID
        : Number(collectionId);

    if (newThumbnail !== null) {
      let formdata = new FormData();
      formdata.append("file", newThumbnail);
      let res = await uploadImage(formdata);
      if (res?.status === 200) {
        Object.assign(data, { ThumbnailId: res?.data[0]?.id });
        if (gallery?.length > 0) {
          for (let i = 0; i < gallery?.length; i++) {
            let galleryFormdata = new FormData();
            gallery?.map((image) => galleryFormdata?.append("file", image));
            let res2 = await uploadImage(galleryFormdata);
            if (res2?.status === 200) {
              Object.assign(data, { gallery: res2?.data?.map((id) => id.id) });
            }
          }
        }
        let finalGalleryList = prevImgList?.concat(
          data?.gallery?.filter((item) => prevImgList?.indexOf(item?.id) < 0)
        );
        let fGalleryArr = finalGalleryList?.filter((img) => img !== undefined);

        let fData = {
          ...data,
          description: desc || data?.description,
          gallery: fGalleryArr || data?.gallery,
          CategoryId: +catID || +category,
          SubCategoryId: subCatID,
          CollectionId: collID,
          cod_enabled: cod_enabled,
          is_active,
          shipping_value,
          shipping,
          show_price,
          enquiry_enabled,
          rating: rating || data?.reting,
          yt_video_link,
          product_return,
          return_days: +return_days || productInfo?.return_days,
        };
        if (fData.SubCategoryId === null) {
          delete fData.SubCategoryId;
        }
        delete fData?.prevGalleryID;
        delete fData.id;
        delete fData.CollectionStaticId;
        delete fData.createdAt;
        delete fData.updatedAt;
        delete fData?.ratings;
        delete fData?.variants;
        delete fData?.shipping;
        // delete fData?.SubCategoryId;
        delete fData?.category;
        delete fData?.thumbnail;
        delete fData?.tags;
        delete fData?.collections;
        delete fData?.coupons;
        // delete fData?.return_days;
        delete fData?.sub_category;
        const res3 = await updateProduct(param.id, fData);
        if (res3?.status === 200) {
          SuccessAlert("Product updated ");
        }
      }
    } else {
      if (gallery?.length > 0) {
        for (let i = 0; i < gallery?.length; i++) {
          let galleryFormdata = new FormData();
          gallery?.map((image) => galleryFormdata?.append("file", image));
          let res2 = await uploadImage(galleryFormdata);
          if (res2?.status === 200) {
            Object.assign(data, { gallery: res2?.data?.map((id) => id.id) });
          }
        }
      }
      let finalGalleryList = prevImgList?.concat(
        data?.gallery?.filter((item) => prevImgList?.indexOf(item.id) < 0)
      );
      let fGalleryArr = finalGalleryList?.filter(
        (img) => typeof img === "number"
      );

      let fData = {
        ...data,
        description: desc || data.description,
        gallery: fGalleryArr || data?.gallery,
        CategoryId: +catID || +category,
        SubCategoryId: subCatID,
        thumbnail: prevThumbnailID,
        cod_enabled,
        is_active,
        shipping_value,
        shipping_value_type: shipping,
        show_price,
        enquiry_enabled,
        CollectionId: collID,
        rating,
        yt_video_link,
        product_return,
        return_days: +return_days || productInfo?.return_days,
      };
      if (fData.SubCategoryId === null) {
        delete fData.SubCategoryId;
      }
      delete fData?.prevGalleryID;
      delete fData.id;
      delete fData.CollectionStaticId;
      delete fData.createdAt;
      delete fData.updatedAt;
      delete fData?.ratings;
      delete fData?.variants;
      // delete fData?.shipping;
      delete fData?.sub_category;
      delete fData?.category;
      delete fData?.thumbnail;
      delete fData?.tags;
      delete fData?.collections;
      delete fData?.coupons;
      // console.log(fData);
      const res3 = await updateProduct(param.id, fData);
      if (res3?.status === 200) {
        thankyouModalHandler();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(updateProductHandler)}>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-4">
          <IoMdArrowRoundBack
            className="hover:scale-90 transition-all duration-500 cursor-pointer text-2xl"
            onClick={() => navigate(-1)}
          />
          <span className="text-xl font-semibold">
            Edit Product Information
          </span>
        </div>
        <AddButton text={"Update"} />
      </div>

      <div className="mt-4 w-full flex flex-col gap-4">
        {/* product and general infomation */}
        <div className="w-full grid lg:grid-cols-2 gap-4">
          {/* product Information */}
          <div className="p-3 rounded-xl w-full border">
            <div className="text-lg font-semibold">
              <h5>Product Information</h5>
            </div>

            <div className="mt-8 flex flex-col">
              <InputComp4
                size={"w-full flex flex-col gap-0.5"}
                label={"Name"}
                require={true}
                defaultValue={productInfo?.name}
                register={register}
                registerValue={"name"}
                value={productInfo?.name}
                errors={errors.name?.message}
              />

              <div className=" w-full flex items-center gap-4 my-4">
                <div className="w-full  flex flex-col gap-0.5">
                  <label>
                    Category<span className="text-red-500">*</span>
                  </label>
                  <select
                    className=" border-gray-200 rounded"
                    name="state"
                    onChange={(e) => categoryChangeHandler(e.target.value)}
                  >
                    <option selected hidden>
                      {productInfo?.category?.name}
                    </option>
                    {showCategory?.map((cat, i) => (
                      <option value={cat?.id} key={i}>
                        {cat?.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-full  flex flex-col gap-0.5">
                  <label>Sub Category</label>
                  <select
                    className=" border-gray-200 rounded"
                    name="state"
                    onChange={(e) => subCatChangehandler(e.target.value)}
                  >
                    <option selected hidden>
                      {productInfo?.sub_category?.name}
                    </option>
                    {showSubCategory?.map((cat, i) => (
                      <option value={cat?.id} key={i}>
                        {cat?.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="w-full flex flex-col gap-0.5 mb-4">
                <label>Collection</label>
                <select
                  className=" border-gray-200 rounded"
                  name="state"
                  onChange={(e) => setCollectionsId(e.target.value)}
                >
                  <option selected disabled>
                    {productInfo?.collections[0]?.name}
                  </option>
                  {collections?.map((coll) => (
                    <option value={coll?.id} key={coll?.id}>
                      {coll?.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-full flex flex-col gap-4">
                <div className="w-full">
                  <label className="mb-0">
                    Description<span className="text-red-500">*</span>
                  </label>
                  <div className="w-full mt-2">
                    <JoditEditor
                      value={productInfo?.description}
                      onChange={(value) => setDescription(value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* general information */}
          <div className="p-3 rounded-xl w-full border">
            <div className="text-lg font-semibold">
              <h5>General Information</h5>
            </div>
            <div className="mt-8 flex flex-col gap-4">
              <div className="w-full flex items-center gap-4">
                <div className="w-full flex flex-col gap-0.5">
                  <label>
                    Shipping Type<span className="text-red-500">*</span>
                  </label>
                  <select
                    className="formInput"
                    value={shipping}
                    onChange={(e) => shippingTypeHandler(e.target.value)}
                  >
                    {shippingTypeOptions?.map((ship, i) => (
                      <option value={ship?.name} key={i}>
                        {ship.name}
                      </option>
                    ))}
                  </select>
                </div>
                {shipping !== "FREE_SHIPPING" ? (
                  <div className="w-full flex flex-col gap-0.5">
                    <label >Shipping Price</label>
                    <input
                      className="formInput"
                      type="number"
                      defaultValue={productInfo?.shipping_value}
                      {...register("shipping_value", {
                        value: productInfo?.shipping_value,
                      })}
                      onChange={(e) => setShipping_value(e.target.value)}
                    />
                  </div>
                ) : null}
              </div>

              <div className="w-full flex flex-col gap-0.5">
                <label>Video Link</label>
                <input
                  className="formInput"
                  type="url"
                  defaultValue={productInfo?.yt_video_link}
                  onChange={(e) => setYt_video_link(e.target.value)}
                />
              </div>
              <div className="w-full flex flex-col gap-0.5">
                <label>
                  Rating<span className="text-red-500">*</span>
                </label>
                <input
                  className="formInput"
                  type="number"
                  defaultValue={productInfo?.rating}
                  onChange={(e) => setRating(e.target.value)}
                  min="1"
                  max="5"
                  step="0.5"
                />
                {/* </div> */}
              </div>
              <div className="w-full grid grid-cols-2 gap-4 mt-4">
                <CheckTabInput
                  value={cod_enabled}
                  setValue={setIsCodAllowed}
                  label={"COD Allowed :"}
                  position={"justify-start"}
                />
                <CheckTabInput
                  value={is_active}
                  setValue={setIsActive}
                  label={"Display :"}
                  position={"justify-start"}
                />
                <CheckTabInput
                  value={show_price}
                  setValue={setShowPrice}
                  label={"Show Price :"}
                  position={"justify-start"}
                />
                <CheckTabInput
                  value={enquiry_enabled}
                  setValue={setEnquiry}
                  label={"Enquiry :"}
                  position={"justify-start"}
                />
              </div>

              <div className="w-full flex items-center justify-start gap-4 mt-6">
                <CheckTabInput
                  value={product_return}
                  setValue={setProductReturn}
                  label={"Returnable :"}
                  position={"justify-start"}
                />
                {product_return && (
                  // <InputCompState
                  //   size={"mb-4 flex flex-col"}
                  //   label={"Days"}
                  //   value={productInfo?.return_days}
                  //   setValue={setReturnDays}
                  //   required={true}
                  // />
                  <div className=" flex flex-col ">
                    <label>Days</label>
                    <input
                      className="formInput"
                      defaultValue={productInfo?.return_days}
                      onChange={(e) => setReturnDays(e.target.value)}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Variant and Description */}
        <div className="w-full grid lg:grid-cols-2 gap-4">
          {/* VARIANTS */}
          <div className=" p-3 rounded-xl w-full border">
            <div className="flex w-full items-center justify-between">
              <div className="text-lg font-semibold">
                <h5>Product Variants</h5>
              </div>
              <span
                className="submitButton cursor-pointer"
                onClick={variantInputHandler}
              >
                Add More
              </span>
            </div>
            <div className="w-full flex items-center ">
              <div className="w-full flex flex-col mb-4 ">
                {prevVariantList?.map((variant) => {
                  return (
                    <div
                      className="w-full flex items-center gap-2"
                      key={variant.id}
                    >
                      <DisabledInput
                        size={"w-full flex flex-col gap-0.5 py-3"}
                        label={"Name"}
                        require={true}
                        value={variant?.name}
                      />
                      <DisabledInput
                        size={"w-full flex flex-col gap-0.5 py-3"}
                        label={"Quantity"}
                        require={true}
                        value={variant?.quantity}
                      />
                      <DisabledInput
                        size={"w-full flex flex-col gap-0.5 py-3"}
                        label={"Price"}
                        require={true}
                        value={variant?.price}
                      />
                      <DisabledInput
                        size={"w-full flex flex-col gap-0.5 py-3"}
                        label={"Strike Price"}
                        require={true}
                        value={variant?.strike_price}
                      />

                      <div className="h-full flex items-center gap-2 pt-4">
                        <BsPencil
                          className="h-4 w-4 hover:scale-90 transition-all duration-300 cursor-pointer"
                          onClick={() => editModalHandler(variant?.id, variant)}
                        />
                        <BsTrash
                          className="h-4 w-4 hover:scale-90 transition-all duration-300 cursor-pointer text-red-600"
                          onClick={() => deletePrevVariantHandler(variant?.id)}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="p-3 rounded-xl w-full border">
            <div className="text-lg font-semibold">
              <h5>Product Media</h5>
            </div>
            <div className="w-full flex items-center flex-col gap-4">
              <div className="w-full flex items-center mt-4 gap-4">
                <ProductInputMedia
                  label={"Thumbnail"}
                  required={true}
                  image={newThumbnail}
                  setImage={setNewThumbnail}
                  data={productInfo?.thumbnail}
                />
              </div>
              {/* gallery */}
              <div className="w-full flex flex-col ">
                <label className="">Images</label>
                <div className="w-full">
                  <input
                    type="file"
                    id="formFileMultiple1"
                    multiple
                    onChange={galleryImageHandler}
                  />
                </div>
              </div>
              <div className="w-full flex items-start gap-2 ">
                <div className="w-full gap-2 overflow-x-auto flex-nowrap grid grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 scrollbar-hide">
                  {prevGalleryList?.map((image, i) => {
                    return (
                      <div
                        key={i}
                        className="w-[180px] flex flex-col items-center"
                      >
                        <img
                          src={
                            image?.url?.includes("https://")
                              ? image?.url
                              : image?.url
                          }
                          width={"auto"}
                          height={"auto"}
                          alt="image"
                          className="h-[160px] w-[160px] rounded-md object-contain"
                        />
                        <div
                          onClick={() => removePrevImageHandler(image?.id)}
                          className="pt-1 font-semibold w-full text-center text-red-600 cursor-pointer"
                        >
                          Remove
                        </div>
                      </div>
                    );
                  })}
                  {gallery?.map((image, i) => (
                    <div
                      key={i}
                      className="w-[180px] flex flex-col items-center "
                    >
                      <img
                        src={URL.createObjectURL(image)}
                        alt="Image"
                        width={"auto"}
                        height={"auto"}
                        className="h-[160px] w-[160px] rounded-md object-cover"
                      />
                      <div
                        onClick={() => removeNewGalleryImage(i)}
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
  );
};

export default EditProductForm;

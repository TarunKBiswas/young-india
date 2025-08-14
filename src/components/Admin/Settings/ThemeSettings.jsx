import { useEffect, useRef, useState } from "react";
import { getStoreData, updatedStoreData } from "../../../utils/settings.js";
import { state } from "../../../data/state.js";
import { SketchPicker } from "react-color";
import {
  ProductSkeletonStyle,
  ProductSkeletonStyleMobile,
} from "./ProductSkeletonStyle.jsx";
import { IoBatteryHalf } from "react-icons/io5";
import { MdNetworkCell, MdOutlineNetworkWifi3Bar } from "react-icons/md";
import CategorySkeletonStyle from "./CategorySkeletonStyle.jsx";
import { BiPlus } from "react-icons/bi";
import {
  VscChromeClose,
  VscChromeMinimize,
  VscChromeRestore,
} from "react-icons/vsc";
import { SuccessAlert } from "../../Toast.jsx";
import { useSnapshot } from "valtio";

const ThemeSettings = () => {
  const snap = useSnapshot(state);
  let logo = snap.brandInfo?.logo_dark?.url || snap.brandInfo?.logo_light?.url;
  let name = snap.brandInfo?.name;

  let d = new Date("2011-04-20T09:30:51.01");

  const [storeData, setStoreData] = useState(null);
  const [colorData, setColorData] = useState({
    bg_color: "",
    text_color: "",
    nav_bg_color: "",
    nav_text_color: "",
    promo_bg_color: "",
    promo_text_color: "",
    logo_size: "70",
    product_card_style: "SQUARE",
    category_card_style: "LANDSCAPE",
    product_list_span_mobile: 2,
    product_list_span_desktop: 4,
  });

  const pickerRef = useRef(null);

  const [showBgColorPicker, setShowBgColorPicker] = useState(false);
  const [showTextColorPicker, setShowTextColorPicker] = useState(false);
  const [showNavTextColorPicker, setShowNavTextColorPicker] = useState(false);
  const [showNavBgColorPicker, setShowNavBgColorPicker] = useState(false);
  const [showPromoBgColorPicker, setShowPromoBgColorPicker] = useState(false);
  const [showPromoTextColorPicker, setShowPromoTextColorPicker] =
    useState(false);

  const getData = async () => {
    try {
      let res = await getStoreData();
      // console.log(res);
      setStoreData(res?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (storeData === null) {
      getData();
    } else {
      setColorData({
        bg_color: +storeData?.bg_color || storeData?.bg_color,
        text_color: storeData?.text_color || storeData?.text_color,
        nav_bg_color: storeData?.nav_bg_color || storeData?.nav_bg_color,
        nav_text_color: storeData?.nav_text_color || storeData?.nav_text_color,
        promo_bg_color: storeData?.promo_bg_color || storeData?.promo_bg_color,
        promo_text_color:
          storeData?.promo_text_color || storeData?.promo_text_color,
        product_card_style: storeData?.product_card_style || "SQUARE",
        category_card_style: storeData?.category_card_style || "LANDSCAPE",
        product_list_span_mobile: storeData?.product_list_span_mobile || 2,
        product_list_span_desktop: storeData?.product_list_span_desktop || 4,
        logo_size: storeData?.logo_size || colorData.logo_size,
      });
    }
  }, [colorData.logo_size, storeData]);

  const getArray = (count) => {
    var arr = [];
    for (let i = 0; i < count; i++) {
      arr.push(i);
    }
    return arr;
  };

  const submitHandler = async () => {
    try {
      let res = await updatedStoreData(colorData);

      if (res?.status === 200) {
        SuccessAlert("Theme updated successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setShowBgColorPicker(false);
        setShowTextColorPicker(false);
        setShowNavBgColorPicker(false);
        setShowNavTextColorPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full">
      <div className="w-full flex flex-col items-start justify-start">
        {/* color pickers */}
        <div className="w-full grid grid-cols-4 items-start mt-6 gap-4">
          {/* Theme Color */}
          <div className="w-full">
            <label htmlFor="">Primary Color</label>
            <div className="relative">
              <input
                type="text"
                className="formInput"
                defaultValue={colorData?.bg_color || storeData?.bg_color}
              />
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer ">
                <span
                  className={`p-2.5 rounded-full hover:scale-110 transition-all duration-300 border`}
                  style={{
                    backgroundColor: colorData?.bg_color || storeData?.bg_color,
                  }}
                  onClick={() => setShowBgColorPicker(!showBgColorPicker)}
                ></span>
              </span>
            </div>
            {showBgColorPicker ? (
              <div ref={pickerRef}>
                <SketchPicker
                  color={colorData?.bg_color !== null}
                  onChange={(color) =>
                    setColorData({ ...colorData, bg_color: color.hex })
                  }
                />
              </div>
            ) : null}
          </div>

          {/* Text color */}
          <div className="w-full">
            <label htmlFor="">Text Color</label>
            <div className="relative">
              <input
                type="text"
                className="formInput"
                value={colorData.text_color}
              />
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer ">
                <span
                  className={`p-2.5 rounded-full bg-[${colorData?.text_color}] hover:scale-110 transition-all duration-300 border`}
                  style={{ backgroundColor: colorData?.text_color }}
                  onClick={() => setShowTextColorPicker(!showTextColorPicker)}
                ></span>
              </span>
            </div>
            {showTextColorPicker ? (
              <div ref={pickerRef}>
                <SketchPicker
                  color={colorData?.text_color !== null}
                  onChange={(color) =>
                    setColorData({ ...colorData, text_color: color.hex })
                  }
                />
              </div>
            ) : null}
          </div>

          {/* nav bg color */}
          <div className="w-full">
            <label htmlFor="">Navbar Color</label>
            <div className="relative">
              <input
                type="text"
                className="formInput"
                value={colorData.nav_bg_color}
              />
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer ">
                <span
                  className={`p-2.5 rounded-full bg-[${colorData?.nav_bg_color}] hover:scale-110 transition-all duration-300 border`}
                  style={{ backgroundColor: colorData?.nav_bg_color }}
                  onClick={() => setShowNavBgColorPicker(!showNavBgColorPicker)}
                ></span>
              </span>
            </div>
            {showNavBgColorPicker ? (
              <div ref={pickerRef}>
                <SketchPicker
                  color={colorData?.nav_bg_color !== null}
                  onChange={(color) =>
                    setColorData({ ...colorData, nav_bg_color: color.hex })
                  }
                />
              </div>
            ) : null}
          </div>

          {/* nav text color */}
          <div className="w-full">
            <label htmlFor="">Navbar text Color</label>
            <div className="relative">
              <input
                type="text"
                className="formInput"
                value={colorData.nav_text_color}
              />
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer">
                <span
                  className={`p-2.5 rounded-full bg-[${colorData?.nav_text_color}] hover:scale-110 transition-all duration-300 border`}
                  style={{ backgroundColor: colorData?.nav_text_color }}
                  onClick={() =>
                    setShowNavTextColorPicker(!showNavTextColorPicker)
                  }
                ></span>
              </span>
            </div>
            {showNavTextColorPicker ? (
              <div ref={pickerRef}>
                <SketchPicker
                  color={colorData?.nav_text_color !== null}
                  onChange={(color) =>
                    setColorData({ ...colorData, nav_text_color: color.hex })
                  }
                />
              </div>
            ) : null}
          </div>

          {/* promo bg color */}
          <div className="w-full">
            <label htmlFor="">Promo Bg Color</label>
            <div className="relative">
              <input
                type="text"
                className="formInput"
                value={colorData.promo_bg_color}
              />
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer">
                <span
                  className={`p-2.5 rounded-full bg-[${colorData?.promo_bg_color}] hover:scale-110 transition-all duration-300 border`}
                  style={{ backgroundColor: colorData?.promo_bg_color }}
                  onClick={() =>
                    setShowPromoBgColorPicker(!showPromoBgColorPicker)
                  }
                ></span>
              </span>
            </div>
            {showPromoBgColorPicker ? (
              <div ref={pickerRef}>
                <SketchPicker
                  color={colorData?.promo_bg_color !== null}
                  onChange={(color) =>
                    setColorData({ ...colorData, promo_bg_color: color.hex })
                  }
                />
              </div>
            ) : null}
          </div>
          {/* promo text color */}
          <div className="w-full">
            <label htmlFor="">promo text Color</label>
            <div className="relative">
              <input
                type="text"
                className="formInput"
                value={colorData.promo_text_color}
              />
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer">
                <span
                  className={`p-2.5 rounded-full bg-[${colorData?.promo_text_color}] hover:scale-110 transition-all duration-300 border`}
                  style={{ backgroundColor: colorData?.promo_text_color }}
                  onClick={() =>
                    setShowPromoTextColorPicker(!showPromoTextColorPicker)
                  }
                ></span>
              </span>
            </div>
            {showPromoTextColorPicker ? (
              <div ref={pickerRef}>
                <SketchPicker
                  color={colorData?.promo_text_color !== null}
                  onChange={(color) =>
                    setColorData({ ...colorData, promo_text_color: color.hex })
                  }
                />
              </div>
            ) : null}
          </div>
          {/* <div className="w-full"></div> */}
          <div className="w-full ">
            <div className="w-full flex flex-col ">
              <label htmlFor="">Logo Size </label>
              <input
                type="text"
                className="border border-gray-200 p-2 rounded"
                defaultValue={storeData?.logo_size || colorData?.logo_size}
                onChange={(e) =>
                  setColorData({ ...colorData, logo_size: e.target.value })
                }
              />
              <div className="w-full flex justify-end">
                <label className="text-xs">(ex: 100)</label>
              </div>
            </div>
          </div>
        </div>

        {/* Card styles and spans */}
        <div className="w-full flex items-center mt-6">
          <div className="w-full grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="w-full flex flex-col gap-1">
              <label htmlFor="">Product Card Style</label>
              <select
                className="border w-full p-2 border-gray-200 rounded"
                onChange={(e) =>
                  setColorData({
                    ...colorData,
                    product_card_style: e.target.value,
                  })
                }
              >
                <option value="" selected>
                  {colorData.product_card_style || "PORTRAIT"}
                </option>
                <option value="PORTRAIT">Portrait</option>
                <option value="SQUARE">Square</option>
              </select>
            </div>
            <div className="w-full flex flex-col gap-1">
              <label htmlFor="">Category Card Style</label>
              <select
                className="border w-full p-2 border-gray-200 rounded"
                onChange={(e) =>
                  setColorData({
                    ...colorData,
                    category_card_style: e.target.value,
                  })
                }
              >
                <option value="" selected>
                  {colorData.category_card_style || "LANDSCAPE"}
                </option>
                <option value="LANDSCAPE">Landscape</option>
                <option value="SQUARE">Square</option>
              </select>
            </div>
            <div className="w-full flex flex-col gap-1">
              <label htmlFor="">Product List Span (Mobile)</label>
              <select
                className="border w-full p-2 border-gray-200 rounded"
                onChange={(e) =>
                  setColorData({
                    ...colorData,
                    product_list_span_mobile: e.target.value,
                  })
                }
                defaultValue={colorData.product_list_span_mobile || 2}
              >
                <option value={colorData.product_list_span_mobile || 2}>
                  {colorData.product_list_span_mobile || 2}
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
              <span className="w-full flex items-end justify-end text-xs pt-1">
                (2 Recommended)
              </span>
            </div>
            <div className="w-full flex flex-col gap-1">
              <label htmlFor="">Product List Span (Desktop)</label>
              <select
                className="border w-full p-2 border-gray-200 rounded"
                onChange={(e) =>
                  setColorData({
                    ...colorData,
                    product_list_span_desktop: e.target.value,
                  })
                }
                defaultValue={colorData.product_list_span_desktop}
              >
                <option
                  value={colorData.product_list_span_desktop || 4}
                  selected
                  disabled
                >
                  {colorData.product_list_span_desktop || 4}
                </option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
              <span className="w-full flex items-end text-xs justify-end pt-1">
                (4 Recommended)
              </span>
            </div>
          </div>
        </div>

        {/*Submit button*/}
        <div className="w-full flex items-end justify-end mt-6 ">
          <button className="submitButton" onClick={submitHandler}>
            Submit
          </button>
        </div>

        {/* span Previews */}
        <div className="w-full hidden md:flex md:flex-col-reverse items-start justify-evenly gap-2 flex-col 3xl:flex-row lg:items-center mt-10">
          {/* mobile emulator */}
          <div className="py-1 border-2 border-gray-400 rounded-2xl h-[600px] w-[280px] relative ">
            <div className="w-full flex items-center justify-between mb-2 px-2">
              <div className="w-full text-xs ">
                {d.getHours()}:{d.getMinutes()}
              </div>
              <div className=" w-full flex items-center justify-end gap-1">
                <MdNetworkCell />
                <MdOutlineNetworkWifi3Bar />
                <IoBatteryHalf />
              </div>
            </div>
            <hr />
            <div
              className={`py-2 max-h-[500px] min-h-[500px] bg-gray-50 overflow-hidden gap-2 flex flex-col`}
              // style={{ backgroundColor: colorData?.bg_color }}
            >
              <div className="w-full flex gap-1 pl-1">
                {getArray(5).map((i) => (
                  <CategorySkeletonStyle
                    key={i}
                    aspect={colorData.category_card_style}
                  />
                ))}
              </div>
              <div
                className={`grid grid-cols-${colorData.product_list_span_mobile} gap-2 px-1`}
              >
                {getArray(16).map((i) => {
                  return (
                    <ProductSkeletonStyleMobile
                      key={i}
                      aspect={colorData.product_card_style}
                      row={colorData.mobileSpan}
                    />
                  );
                })}
              </div>
            </div>

            <div className="absolute w-full bottom-0 px-2">
              <div className="w-full flex items-center justify-between mb-2">
                {getArray(4).map((i) => {
                  return (
                    <div className="flex flex-col items-center px-3" key={i}>
                      <div className="h-6 w-6 bg-gray-600 rounded-full mb-2" />
                      <div className="h-1.5 bg-gray-200 rounded-full w-8 mb-2"></div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Desktop emulator */}
          <div className=" border border-gray-400 rounded-2xl h-[600px] w-[900px] 2xl:w-[1000px] relative ">
            {/* head */}
            <div className="w-full flex items-center justify-between px-3  bg-gray-700 rounded-2xl rounded-b-none">
              <div className="w-full text-xs ">
                <div className="w-[150px] bg-white mt-2.5 ml-4 h-full flex justify-between py-1.5 px-2 items-center rounded-md rounded-b-none">
                  <span className="text-xs">{name}</span>
                  <BiPlus className="rotate-45 h-4 w-4" />
                </div>
              </div>
              <div className=" w-full flex items-center justify-end gap-3">
                <VscChromeMinimize className="h-4 w-4 fill-gray-300" />
                <VscChromeRestore className="h-4 w-4 fill-gray-300" />
                <VscChromeClose className=" h-4 w-4 fill-gray-300" />
              </div>
            </div>

            {/* navbar */}
            <div
              className={`w-full min-h-[50px] flex items-center justify-between px-4`}
              style={{
                backgroundColor:
                  colorData?.nav_bg_color || storeData?.nav_bg_color,
              }}
            >
              <img
                src={logo}
                width={"auto"}
                height={"auto"}
                alt="Logo"
                style={{ height: `${colorData?.logo_size}px` }}
              />
              <div
                className="w-full flex items-center justify-center gap-4"
                style={{
                  color: colorData?.nav_text_color || storeData?.nav_text_color,
                }}
              >
                <span>Categories</span>
                <span>Collection</span>
              </div>
              <div className="flex gap-2">
                <div className="h-6 w-6 border rounded-full " />
                <div className="h-6 w-6 border rounded-full " />
                <div className="h-6 w-6 border rounded-full " />
              </div>
            </div>
            {/* <hr /> */}

            {/* content */}
            <div className="py-2 max-h-[500px] min-h-[500px] bg-gray-50 overflow-hidden gap-2 flex flex-col">
              <div className="w-full flex gap-1 px-20">
                {getArray(8).map((i) => {
                  return (
                    <CategorySkeletonStyle
                      aspect={colorData.category_card_style}
                      key={i}
                    />
                  );
                })}
              </div>
              <div
                className={`grid grid-cols-${colorData.product_list_span_desktop} gap-1 px-20`}
              >
                {getArray(20).map((i) => {
                  return (
                    <ProductSkeletonStyle
                      aspect={colorData.product_card_style}
                      key={i}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeSettings;

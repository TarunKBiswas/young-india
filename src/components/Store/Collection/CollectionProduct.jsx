/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
// import { BiSort } from "react-icons/bi";
import { useEffect } from "react";
import SortByDropDown from "../Search/SortByDropDown";
// import FilterCategories from "../UI/FilterCategories";
import {
  getCollectionProduct,
  getFilterCollection,
} from "../../../utils/Store/collection";
import { webState } from "../../../data/webStates";
import Container from "../UI/Wrappers/Container.Wrapper";
import { useSnapshot } from "valtio";
import ProductCard from "../UI/Cards/ProductCard";
import { ProductSkeleton } from "../UI/Cards/Skeletons";
import NoDataAnime from "../../Admin/UI/NoDataAnime";

const CollectionProduct = () => {
  const param = useParams();
  const [data, setData] = useState(null);
  const [show, setShow] = useState(false);
  const [collectionProduct, setCollectionProduct] = useState(null);
  const [filterGroup, setFiltergroup] = useState([]);
  const [filterFor, setFilterFor] = useState({
    priceMax: "",
    priceMin: "",
    sortBy: "",
    sortThrough: "",
  });

  const snap = useSnapshot(webState);
  const dekstopProductSpan = snap.storeInfo?.product_list_span_desktop;
  const mobileProductSpan = snap.storeInfo?.product_list_span_mobile;

  const collectionData = useCallback(async () => {
    webState.isLoading = true;
    try {
      let res = await getCollectionProduct(param?.id);
      // console.log(res);
      if (res?.status === 200) {
        setCollectionProduct(res?.data?.data?.products);
        setData(res?.data?.data?.collection);
      }
    } catch (error) {
      console.log(error);
    }
    webState.isLoading = false;
  }, [param.id]);

  const filterCollection = async () => {
    let data = {
      id: param?.id,
      sortThrough: filterFor?.sortName,
      sortBy: filterFor?.sortBy,
      priceMax: filterFor.priceMax,
      priceMin: filterFor.priceMin,
    };
    webState.isLoading = true;
    try {
      let res = await getFilterCollection(data);
      if (res?.status === 200) {
        setFiltergroup(res?.data?.data?.products);
        setShow(false);
      }
    } catch (error) {
      console.log(error);
    }
    webState.isLoading = false;
  };

  // const SortByDropDownHandler = () => {
  //   setShow(!show);
  // };

  const showData = filterGroup?.length ? filterGroup : collectionProduct;

  // const filterDropDownHandler = () => {
  //   setShowFilter(!showFilter);
  //   setShow(false);
  // };

  useEffect(() => {
    collectionData();
  }, [param.id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col">
      <div className="w-full flex items-center bg-themecolor h-40 justify-center">
        <div className="text-2xl font-semibold text-textcolor capitalize">
          {data?.name}
        </div>
      </div>
      <Container className={"px-2 min-h-[100vh] mb-10"}>
        <div className="w-full py-2 md:py-0 flex flex-col md:flex-row justify-between gap-1 items-center md:my-4 lg:mt-8">
          {/* <span className="text-2xl font-semibold text-darkText capitalize pb-2 py-4 lg:py-0">
          {data?.name}
        </span> */}

          <div className="flex item-center w-full md:w-auto mt-4 lg:mt-0">
            <div className=" w-full flex  items-center justify-end gap-3 cursor-pointer">
              <div className="flex flex-col items-center justify-end gap-1 relative text-black/80">
                {/* <div
                  className="flex items-center gap-1"
                  onClick={SortByDropDownHandler}
                >
                  <BiSort className="h-4 w-4" />
                  <span className="text-sm">Sort By</span>
                </div> */}
                <div className="flex items-start absolute cursor-pointer mr-32 lg:mr-0">
                  {show ? (
                    <SortByDropDown
                      show={show}
                      setShow={setShow}
                      dropDownFilterFor={filterFor}
                      searchFilter={() => filterCollection()}
                      setDropDrownFilterFor={setFilterFor}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex items-center justify-center">
          {showData?.length > 0 ? (
            <div
              className={`w-full grid grid-cols-${
                mobileProductSpan || 2
              } lg:grid-cols-${
                dekstopProductSpan || 3
              } gap-3 my-3 place-items-center`}
            >
              {showData?.map((item, i) => {
                return <ProductCard product={item} key={i} />;
              })}
            </div>
          ) : (
            <div className="w-full">
              {webState.isLoading ? (
                <ProductSkeleton />
              ) : (
                <NoDataAnime msg={"No Data Found"} />
                // <ProductSkeleton />
              )}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default CollectionProduct;

/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState, useRef } from "react";
import { webState } from "../../../data/webStates";
import Container from "../UI/Wrappers/Container.Wrapper";
import { useSnapshot } from "valtio";
import SortByDropDown from "../Search/SortByDropDown";
import { getFilterProduct, getSearch } from "../../../utils/Store/Products";
import Filter from "../UI/Icon/Filter";
import FilterDropDown from "../Search/FilterDropDown";
import Sort from "../UI/Icon/Sort";
import { ApplyButton, FilterButton, ResetButton } from "../UI/Buttons";
import { sortOptions } from "../../../data/ProductsFilterData";
import { getPopularProducts } from "../../../utils/Store/Homepage";
import NoDataAnime from "../../Admin/UI/NoDataAnime";
import ProductCard from "../UI/Cards/ProductCard";
import { SearchDesktop, SearchPhone } from "./Search";
import ScrollAnimation from "../../../hooks/ScrollAnimation";
import { ProductSkeleton } from "../UI/Cards/Skeletons";

const ITEMS_PER_PAGE = 9;

const PopularProducts = () => {
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [products, setProducts] = useState([]);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const loadingRef = useRef(null);

  const snap = useSnapshot(webState);
  const [filterFor, setFilterFor] = useState({
    categoriesID: [],
    priceMax: "",
    priceMin: "",
    sortBy: "",
    sortThrough: "",
  });

  ScrollAnimation();

  let categories = snap.categoriesData;

  const getProducts = useCallback(async () => {
    webState.isLoading = true;
    try {
      let res = await getPopularProducts(page, ITEMS_PER_PAGE);
      if (res?.status === 200) {
        if (res?.data?.data.length > 0) {
          const data = res?.data?.data;
          setProducts((prevProducts) => 
            page === 1 ? data : [...prevProducts, ...data]
          );
          setTotalPages(res?.data?.meta?.pagination?.pageCount || 0);
        }
      }
      webState.isLoading = false;
    } catch (error) {
      console.error(error);
      webState.isLoading = false;
    }
  }, [page]);

  // Add intersection observer setup
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && !webState.isLoading && page < totalPages && !isFilterApplied) {
          setPage((prev) => prev + 1);
        }
      },
      { 
        threshold: 0.01, // Trigger when 10% of the element is visible
        rootMargin: '100px', // Start loading 100px before the element comes into view
      }
    );

    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }

    return () => {
      if (loadingRef.current) {
        observer.unobserve(loadingRef.current);
      }
    };
  }, [page, totalPages, webState.isLoading, isFilterApplied]);

  useEffect(() => {
    if (!isFilterApplied) {
      getProducts();
    }
  }, [page, getProducts, isFilterApplied]);

  const getSearchProducts = async (setValue) => {
    try {
      let response = await getSearch(searchTerm);
      if (response?.status === 200) {
        setSuggestions(response?.data?.data);
        if (setValue) {
          webState.selectCartProduct = response?.data?.data;
          setSearchTerm("");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (searchTerm?.length >= 2) {
      getSearchProducts(search);
      setSearch(false);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm, search]);

  const resetHandler = () => {
    setShowFilter(false);
  };

  const SortByDropDownHandler = () => {
    setShow(!show);
    setShowFilter(false);
  };

  const filterDropDownHandler = () => {
    setShowFilter(!showFilter);
    setShow(false);
  };

  const handleCheckboxChange = (categoryId, e) => {
    const newFilterFor = e.target.checked
      ? [categoryId, ...filterFor?.categoriesID]
      : filterFor?.categoriesID?.filter((id) => id !== categoryId);

    setFilterFor((prevFilter) => ({
      ...prevFilter,
      categoriesID: newFilterFor,
    }));
  };

  const filterProducts = async () => {
    setProducts([]);
    try {
      let params = {
        category: filterFor?.categoriesID?.join(","),
        sortThrough: filterFor?.sortName,
        sortBy: filterFor?.sortBy,
        priceMax: filterFor.priceMax,
        priceMin: filterFor.priceMin,
      };

      if (
        !params.category &&
        !params.sortBy &&
        !params.priceMax &&
        !params.priceMin
      ) {
        await getProducts();
        setIsFilterApplied(false);
        setShowFilter(false);
        return;
      }

      let res = await getFilterProduct(params);

      if (res?.status === 200) {
        setIsFilterApplied(true);
        setProducts(res?.data?.data);
        webState.searchPagination = res?.data?.meta?.pagination;
        setShowFilter(false);
        setShow(false);
        setPage(1);
      }
      webState.isLoading = false;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* MOBILE VIEW */}
      <Container className={"min-h-[100vh] lg:min-h-max"}>
        <div className="lg:hidden">
          {/* Search */}
          <SearchPhone
            searchTerm={searchTerm}
            setSearch={setSearch}
            setSearchTerm={setSearchTerm}
            suggestions={suggestions}
          />

          {/* Filter */}
          <div className=" w-full flex lg:hidden items-center justify-evenly mb-3">
            {/* filter by */}
            <div className="flex flex-col items-center justify-center gap-1 relative">
              <div
                className="flex items-center gap-1"
                onClick={filterDropDownHandler}
              >
                <Filter className="h-6 w-6" />
                <span className="text-neutral-800 text-opacity-70 text-xs font-normal leading-tight">
                  Filter By
                </span>
              </div>
              <div className="flex items-start absolute h-full">
                {showFilter ? (
                  <FilterDropDown
                    showFilter={showFilter}
                    setShowFilter={setShowFilter}
                    dropDownFilterFor={filterFor}
                    searchFilter={filterProducts}
                    setDropDrownFilterFor={setFilterFor}
                    action={handleCheckboxChange}
                  />
                ) : null}
              </div>
            </div>

            {/* Sort by */}
            <div className="flex flex-col items-center justify-center gap-1 relative">
              <div
                className="flex items-center gap-1"
                onClick={SortByDropDownHandler}
              >
                <Sort className="h-6 w-6" />

                <div className=" text-neutral-800 text-opacity-70 text-xs font-normal leading-tight">
                  Sort By
                </div>
              </div>
              <div className="flex items-start absolute ">
                {show ? (
                  <SortByDropDown
                    show={show}
                    setShow={setShow}
                    dropDownFilterFor={filterFor}
                    searchFilter={filterProducts}
                    setDropDrownFilterFor={setFilterFor}
                  />
                ) : null}
              </div>
            </div>
          </div>

          {/* products */}
          <div className="mx-2 lg:hidden mt-4 mb-20">
            <div className="grid grid-cols-2 gap-2 lg:grid-cols-3">
              {products?.map((item, index) => (
                <div
                  key={item?.id}
                  className="w-full"
                  style={{
                    animation: `zoomIn 0.5s ease-out ${(index % ITEMS_PER_PAGE) * 0.1}s forwards`,
                    opacity: 0,
                  }}
                >
                  <ProductCard product={item} />
                </div>
              ))}
            </div>
            {!isFilterApplied && page < totalPages && (
              <div 
                ref={loadingRef}
                className="flex items-center justify-center w-full mt-6 h-20"
              >
                {webState.isLoading && (
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-webPrimaryColor"></div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* DESKTOP VIEW */}
        <div className="hidden lg:block">
          {/* Search */}
          <SearchDesktop
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            setSearch={setSearch}
            suggestions={suggestions}
          />

          <div className="w-full flex items-start justify-between gap-5 mb-8">
            {/* Filter */}
            <div className="w-[20%] bg-white p-2.5 flex flex-col items-start gap-4">
              <div className="hidden w-full lg:flex items-start justify-between gap-5 mb-8">
                {categories?.length > 0 && (
                  <div className="w-full  flex flex-col items-start gap-4 mt-4">
                    {/* categories */}
                    {
                      <FilterButton title={"Categories"}>
                        {categories?.map((item, index) => (
                          <div
                            key={item?.id}
                            className="flex  items-center gap-2 px-1 cursor-pointer"
                            data-aos="fade-down"
                            data-aos-duration="500"
                            data-aos-delay={index * 100}
                          >
                            <input
                              type="checkbox"
                              className="w-5 h-5 rounded-sm border border-gray-200 checked:text-themecolor cursor-pointer focus:ring-0"
                              id={item?.id}
                              value={item?.name}
                              onChange={(e) => handleCheckboxChange(item?.id, e)}
                              checked={filterFor?.categoriesID?.includes(
                                item?.id
                              )}
                            />
                            <label
                              htmlFor={item?.id}
                              className="flex items-center cursor-pointer justify-between w-full gap-6 "
                            >
                              <span className=" text-sm leading-tight">
                                {item?.name}
                              </span>
                              <span className="text-right text-opacity-50 text-sm font-medium leading-tight">
                                {item?.products}
                              </span>
                            </label>
                          </div>
                        ))}
                      </FilterButton>
                    }

                    <FilterButton title={"Sort By"}>
                      {sortOptions?.map((item, index) => {
                        return (
                          <div
                            key={item?.id}
                            className="flex items-center gap-3 px-1"
                            data-aos="fade-down"
                            data-aos-duration="300"
                            data-aos-delay={index * 100}
                          >
                            <input
                              type="radio"
                              className="h-5 w-5 checked:text-themecolor"
                              id={item?.id}
                              name={"sorting"}
                              value={item?.value}
                              onChange={(e) =>
                                setFilterFor({
                                  ...filterFor,
                                  sortBy: item.val,
                                  sortName: e.target.value,
                                })
                              }
                            />
                            <span className="text-neutral-800 capitalize flex w-full text-sm font-medium leading-tight">
                              {item?.name}
                            </span>
                          </div>
                        );
                      })}
                    </FilterButton>

                    <div className="w-full mt-4 flex items-center justify-start gap-3">
                      <ApplyButton
                        action={() => filterProducts(1, false)}
                        text={"Apply"}
                      />
                      <ResetButton action={resetHandler} />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Products */}
            {products.length > 0 ? (
              <div className="w-[80%]">
                <div className="w-full grid gap-4 lg:grid-cols-3">
                  {products?.map((item, index) => (
                    <div
                      key={item?.id}
                      className="w-full"
                      style={{
                        animation: `zoomIn 0.5s ease-out ${(index % ITEMS_PER_PAGE) * 0.1}s forwards`,
                        opacity: 0,
                      }}
                    >
                      <ProductCard
                        product={item}
                        width="lg:w-auto"
                        height="lg:h-[210px]"
                      />
                    </div>
                  ))}
                </div>
                {!isFilterApplied && page < totalPages && (
                  <div 
                    ref={loadingRef}
                    className="flex items-center justify-center w-full mt-6 h-20"
                  >
                    {webState.isLoading && (
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-webPrimaryColor"></div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full">
                {webState.isLoading ? (
                  <ProductSkeleton />
                ) : (
                  <NoDataAnime msg={"No Data Found"} />
                )}
              </div>
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

export default PopularProducts;

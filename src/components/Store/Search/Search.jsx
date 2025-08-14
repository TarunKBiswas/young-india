/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react-hooks/exhaustive-deps */
import { BsSearch } from "react-icons/bs";
import SortByDropDown from "./SortByDropDown";
import { useState } from "react";
import FilterDropDown from "./FilterDropDown";
import { useSnapshot } from "valtio";
import { webState } from "../../../data/webStates";
import { ApplyButton, FilterButton, ResetButton } from "../UI/Buttons";
import { useEffect } from "react";
import { getFilterProduct, getSearch } from "../../../utils/Store/Products";
import { Link, useNavigate } from "react-router-dom";
import Filter from "../UI/Icon/Filter";
import Sort from "../UI/Icon/Sort";
import Container from "../UI/Wrappers/Container.Wrapper";
import ProductCard from "../UI/Cards/ProductCard";

const sortOptions = [
  {
    id: 2,
    name: "Newest",
    value: "desc",
    current: "sortOptions",
    val: "date",
  },
  {
    id: 3,
    name: "Oldest",
    value: "asc",
    current: "sortOptions",
    val: "date",
  },
  {
    id: 4,
    name: "Price Low To High",
    value: "low-to-high",
    current: "sortOptions",
    val: "price",
  },
  {
    id: 5,
    name: "price High to Low",
    value: "high-to-low",
    current: "sortOptions",
    val: "price",
  },
];

const Search = () => {
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [filterGroup, setFiltergroup] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPageCount, setTotalPageCount] = useState(null);
  const size = 20;
  const snap = useSnapshot(webState);
  const [filterFor, setFilterFor] = useState({
    categoriesID: [],
    priceMax: "",
    priceMin: "",
    sortBy: "",
    sortThrough: "",
  });

  let categories = snap.categoriesData;

  const navigate = useNavigate();

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
      console.log(error);
    }
  };

  let searchProduct = snap.selectCartProduct;

  useEffect(() => {
    if (searchTerm?.length >= 2) {
      const timer = setTimeout(() => {
        getSearchProducts(search);
        setSearch(false);
      }, 1000);

      return () => clearTimeout(timer);
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

  const filterProducts = async (pageNumber, down) => {
    try {
      let params = {
        category: filterFor?.categoriesID?.join(","),
        page: pageNumber || 1,
        size,
        sortThrough: filterFor?.sortName,
        sortBy: filterFor?.sortBy,
        priceMax: filterFor.priceMax,
        priceMin: filterFor.priceMin,
      };
      if (!params?.category && snap.searchTerms) {
        params.search = snap.searchTerms;
      }
      let res = await getFilterProduct(params);
      if (res?.status === 200) {
        const data = res?.data?.data;
        setTotalPageCount(res?.data?.meta?.pagination?.pageCount);
        webState.searchPagination = res?.data?.meta?.pagination;
        if (totalPageCount === 1) {
          setFiltergroup(data);
        } else {
          down
            ? setFiltergroup([...filterGroup, ...data])
            : setFiltergroup([...data, ...filterGroup]);
        }
        setShowFilter(false);
        setShow(false);
        setPage(page + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowMoreClick = (down) => {
    filterProducts(page, down);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const showData = filterGroup?.length ? filterGroup : searchProduct;

  return (
    <>
      <Container>
        {/* MOBILE VIEW */}
        <div className="lg:hidden">
          {/* Search Input */}
          <div className="w-full relative flex items-center justify-center lg:justify-center py-3 h-full  min-w-[300px] px-4">
            <div className="flex items-center justify-center gap-2.5 md:gap-4 w-full md:p-4">
              <div
                className={`transition-all duration-300 flex  justify-center items-center w-full`}
              >
                <div className="w-full relative flex items-center gap-2 justify-center">
                  <input
                    className="webInputStyle text-xs tracking-wider h-[40px] w-full border border-black"
                    placeholder={` Search "Products Name" `}
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  {suggestions.length > 0 && (
                    <ul className="absolute bg-white top-11 w-full border z-40 h-72 overflow-y-scroll">
                      {suggestions?.map((product) => {
                        return (
                          <Link
                            to={`/product/${product.id}`}
                            key={product.id}
                            className="flex gap-2 p-2 cursor-pointer overflow-y-hidden"
                          >
                            <li className="rounded-full w-7 h-7 overflow-hidden">
                              <img
                                width={"auto"}
                                height={"auto"}
                                alt="image"
                                src={
                                  product?.thumbnail?.url &&
                                  product?.thumbnail?.url?.substring(0, 4) ===
                                    "http"
                                    ? product?.thumbnail?.url
                                    : product?.thumbnail?.url
                                }
                              />
                            </li>
                            <li className=" text-black/70 font-medium text-[13px] flex items-center">
                              {product?.name}
                            </li>
                          </Link>
                        );
                      })}
                    </ul>
                  )}

                  {searchTerm?.length > 0 ? (
                    <button
                      onClick={() => {
                        navigate(`/search/${searchTerm}`);
                        setSearch(true);
                      }}
                      className="font-bold text-black text-3xl absolute right-2"
                    >
                      <BsSearch className="h-5 w-5 cursor-pointer" />
                    </button>
                  ) : (
                    <button className="font-bold text-black text-3xl absolute right-2">
                      {searchTerm?.length === 0 && (
                        <BsSearch className="h-5 w-5" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className=" w-full flex lg:hidden items-center justify-evenly mb-3 ">
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
                    searchFilter={() => filterProducts()}
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
                    searchFilter={() => filterProducts()}
                    setDropDrownFilterFor={setFilterFor}
                  />
                ) : null}
              </div>
            </div>
          </div>

          <div className=" w-full flex items-center justify-center gap-2 pb-3">
            <span className="text-violet-600 text-sm font-normal leading-tight">
              {showData?.length}
            </span>
            <span className="text-neutral-800 text-sm font-normal leading-tight">
              Result Found
            </span>
          </div>

          {/* products */}
          <div className="mx-2 lg:hidden mt-4">
            <div className=" grid grid-cols-2 gap-2 lg:grid-cols-4 ">
              {showData?.map((item) => {
                return <ProductCard product={item} key={item?.id} />;
              })}
            </div>
          </div>
          <div className="flex items-center justify-center w-full my-3">
            {snap?.searchPagination?.page <=
              snap?.searchPagination?.pageCount && (
              <button
                type="submit"
                onClick={() => handleShowMoreClick(true)}
                className="flex items-center justify-center border border-themecolor px-2 py-1.5 text-themecolor text-xs "
              >
                Show More
              </button>
            )}
          </div>
        </div>

        {/* DESKTOP VIEW */}
        <div className="hidden w-full lg:flex items-center justify-center">
          <div className="w-full relative flex items-center justify-center p-4 gap-2 max-w-[460px] mx-auto">
            <div className="flex flex-col items-center gap-1 relative px-2 ">
              <div className="flex gap-2.5 py-3 md:gap-4 items-center w-full md:p-4">
                <div
                  className={`transition-all duration-300 flex justify-center items-center w-full`}
                >
                  <div className="w-full max-w-[90%] lg:w-[670px] relative flex items-center gap-2 ">
                    <input
                      className="webInputStyle text-sm tracking-wider h-[45px] w-full border border-black"
                      placeholder={` Search "Products Name" `}
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {suggestions.length > 0 && (
                      <ul className="absolute bg-white top-12 lg:w-[600px]  border z-40 h-80 overflow-y-scroll">
                        {suggestions?.map((product) => {
                          return (
                            <Link
                              to={`/product/${product.id}`}
                              key={product.id}
                              className="flex gap-2 p-2 cursor-pointer overflow-y-hidden"
                            >
                              <li className="rounded-full w-7 h-7 overflow-hidden">
                                <img
                                  width={"auto"}
                                  height={"auto"}
                                  alt="image"
                                  src={
                                    product?.thumbnail?.url &&
                                    product?.thumbnail?.url?.substring(0, 4) ===
                                      "http"
                                      ? product?.thumbnail?.url
                                      : product?.thumbnail?.url
                                  }
                                />
                              </li>
                              <li className=" text-black/70 font-medium text-[13px] flex items-center">
                                {product?.name}
                              </li>
                            </Link>
                          );
                        })}
                      </ul>
                    )}

                    {searchTerm?.length > 0 ? (
                      <button
                        onClick={() => {
                          navigate(`/search/${searchTerm}`);
                          setSearch(true);
                        }}
                        className="font-bold text-black text-3xl absolute right-2"
                      >
                        <BsSearch className="h-5 w-5 cursor-pointer" />
                      </button>
                    ) : (
                      <button className="font-bold text-black text-3xl absolute right-2">
                        {searchTerm?.length === 0 && (
                          <BsSearch className="h-5 w-5" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-violet-600 text-lg font-normal font-['Poppins'] leading-tight">
                  {showData?.length}
                </span>
                <span className="text-neutral-800 text-lg font-normal leading-tight">
                  Result Found
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <div className="bg-white">
        <Container className={"lg:min-h-[100vh]"}>
          <div className="hidden w-full lg:flex items-start justify-between gap-5 mb-8 ">
            <div className="w-[20%] bg-white p-2.5 flex flex-col items-start gap-4 mt-4">
              {/* categories */}
              <FilterButton title={"Categories"}>
                {categories?.map((item) => (
                  <div key={item?.id} className="flex items-center gap-2 px-1">
                    <input
                      type="checkbox"
                      className="w-5 h-5 rounded-sm border border-gray-200 checked:text-themecolor cursor-pointer focus:ring-0"
                      id={item?.id}
                      value={item?.name}
                      onChange={(e) => handleCheckboxChange(item?.id, e)}
                      checked={filterFor?.categoriesID?.includes(item?.id)}
                    />
                    <div className="flex items-center justify-between w-full ">
                      <span className=" text-sm leading-tight">
                        {item?.name}
                      </span>
                      <span className="text-right  text-opacity-50 text-sm font-medium leading-tight">
                        {item?.products}
                      </span>
                    </div>
                  </div>
                ))}
              </FilterButton>

              <FilterButton title={"Sort By"}>
                {sortOptions?.map((item) => {
                  return (
                    <div
                      key={item?.id}
                      className="flex items-center gap-3 px-1"
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
                      <span className="text-neutral-800 text-sm font-medium leading-tight">
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
            <div className="w-[80%] mt-4">
              <div className="w-full flex flex-col items-start">
                <div className=" grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-4 ">
                  {showData?.map((item) => {
                    return <ProductCard product={item} key={item?.id} />;
                  })}
                </div>
                <div className="flex items-center justify-center w-full my-3">
                  {snap?.searchPagination?.page <=
                    snap?.searchPagination?.pageCount && (
                    <button
                      type="submit"
                      onClick={() => handleShowMoreClick(true)}
                      className="border-1 px-3 py-2 rounded border-themecolor text-themecolor  cursor-pointer hover:bg-stone-100 transition-all duration-300 "
                    >
                      Show More
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Search;

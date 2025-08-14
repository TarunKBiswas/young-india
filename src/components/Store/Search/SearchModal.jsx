/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import { webState } from "../../../data/webStates";
import { useSnapshot } from "valtio";
import { useNavigate } from "react-router-dom";
import { getSearch } from "../../../utils/Store/Products";
import Container from "../UI/Wrappers/Container.Wrapper";
import { RxCross2 } from "react-icons/rx";
import ProductCard from "../UI/Cards/ProductCard";
import { HeadingName } from "../UI/Buttons";

const SearchModal = () => {
  // const [search, setSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const snap = useSnapshot(webState);
  const navigate = useNavigate();

  const searchProduct = async (query) => {
    try {
      let response = await getSearch(query || searchTerm, 1, 20);
      if (response?.status === 200) {
        setSuggestions(response?.data?.data);
        webState.selectCartProduct = response?.data?.data;
        webState.searchPagination = response?.data?.meta?.pagination;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (searchTerm?.length >= 2) {
      const timer = setTimeout(() => {
        searchProduct(searchTerm);
        webState.selectCartProduct = suggestions;
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      if (!searchTerm?.length) {
        webState.selectCartProduct = null;
      }
      setSuggestions([""]);
    }
  }, [searchTerm]);

  // const handleSearch = () => {
  //   webState.searchTerms = searchTerm;
  //   webState.fullScreenSearch = false;
  //   setSearchTerm("");
  //   setSearch(true);
  // };

  const vieMoreHandler = () => {
    webState.searchTerms = searchTerm;
    webState.fullScreenSearch = false;
    setSearchTerm("");
    // setSearch(true);
    navigate(`search/${searchTerm}`);
  };

  // const navigateHandler = () => {
  //   webState.fullScreenSearch = false;
  //   navigate("/");
  // };

  let searchProductData = snap.selectCartProduct;

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      webState.fullScreenSearch = false;
      navigate(`search/${searchTerm}`);
    }
  };

  return (
    <div className="w-full h-full overflow-y-scroll overflow-x-hidden bg-white fixed z-[99999] top-0 left-0 ">
      <Container>
        <div className="flex items-center gap-1 relative px-2 mt-8 ">
          <div className="flex gap-2.5 py-3 md:gap-4 items-center w-full md:p-4">
            <div
              className={`transition-all duration-300 flex justify-center items-center w-full`}
            >
              <div className="w-full max-w-[90%] lg:w-[670px] relative flex items-center gap-2">
                <input
                  className="webInputStyle text-sm tracking-wider h-[45px] w-full border border-black"
                  placeholder="Search Products"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onClick={handleKeyPress}
                />
                <button
                  onClick={() => (webState.fullScreenSearch = false)}
                  className="font-bold text-black text-3xl absolute right-2"
                >
                  <RxCross2 className=" h-5 w-5 cursor-pointer" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {searchProductData?.length > 0 ? (
          <div className="mt-3 mx-2">
            {searchProductData?.length > 0 && (
              <div className="flex items-center justify-center w-full gap-2 my-4">
                <span className="text-violet-600 text-lg font-normal leading-tight">
                  {webState?.searchPagination?.total}
                </span>
                <span className="text-neutral-800 text-lg font-normal leading-tight">
                  Result Found Of
                  <span className="px-2 capitalize text-lg">{`"${searchTerm}"`}</span>
                </span>
              </div>
            )}
            {searchProductData?.length > 0 && (
              <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 xl:grid-cols-5">
                {searchProductData?.map((item) => {
                  return (
                    <ProductCard
                      product={item}
                      key={item?.id}
                      onClick={() => (webState.fullScreenSearch = false)}
                    />
                  );
                })}
              </div>
            )}
          </div>
        ) : null}
        {searchProductData?.length > 0 && (
          <div className="flex items-center justify-center w-full my-3">
            <button
              type="submit"
              onClick={vieMoreHandler}
              className=" flex items-center justify-center px-3 py-1.5 rounded border-1 border-themecolor text-themecolor text-sm hover:bg-themecolor transition-all duration-300 hover:text-white "
            >
              View All
            </button>
          </div>
        )}
      </Container>

      <div className="w-full mt-10 px-2.5 bg-white">
        <Container>
          <HeadingName
            title={"Most Searched products"}
            className={"my-5 w-full"}
            classNameTitle={"text-center"}
          />

          <div className="my-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {snap?.searchModelData?.map((item) => {
              return <ProductCard product={item} key={item.id} />;
            })}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default SearchModal;

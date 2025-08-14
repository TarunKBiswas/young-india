/* eslint-disable react/prop-types */
import { BsSearch } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";

export const SearchPhone = ({
  searchTerm,
  setSearchTerm,
  setSearch,
  suggestions,
}) => {
  const navigate = useNavigate();
  return (
    <div className="w-full relative flex items-center justify-center lg:justify-center py-3 h-full  min-w-[300px] px-4">
      <div className="flex items-center justify-center gap-2.5 md:gap-4 w-full md:p-4">
        <div
          className={`transition-all duration-300 flex  justify-center items-center w-full`}
        >
          <div className="w-full relative flex items-center gap-2 justify-center">
            <input
              className="webInputStyle text-xs tracking-wider h-[40px] w-full border border-black"
              placeholder={`Search "Products Name"`}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {suggestions?.length > 0 && (
              <ul className="absolute bg-white top-12 w-full border z-40 h-80 overflow-y-scroll">
                {suggestions?.map((product) => {
                  return (
                    <Link
                      to={`/product/${product.id}`}
                      key={product.id}
                      className="flex gap-2 p-2 cursor-pointer overflow-y-hidden"
                    >
                      <li className="rounded-full w-9 h-9 overflow-hidden">
                        <img
                          src={product?.thumbnail?.url}
                          width={"auto"}
                          height={"auto"}
                          alt="image"
                        />
                      </li>
                      <li className=" text-black/70 font-medium text-base flex items-center">
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
                {searchTerm?.length === 0 && <BsSearch className="h-5 w-5" />}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const SearchDesktop = ({
  searchTerm,
  setSearchTerm,
  suggestions,
  setSearch,
}) => {
  const navigate = useNavigate();
  return (
    <div className="hidden w-full lg:flex items-center justify-center ">
      <div className="w-full relative flex items-center justify-center p-4 gap-2 max-w-[460px] mx-auto">
        <div className="flex flex-col items-center gap-1 relative px-2 ">
          <div className="flex gap-2.5 py-3 md:gap-4 items-center w-full md:p-4">
            <div
              className={`transition-all duration-300 flex justify-center items-center w-full`}
            >
              <div className="w-full lg:w-[670px] relative flex items-center gap-2 ">
                <input
                  className="webInputStyle text-sm tracking-wider h-[45px] w-full border border-gray-200"
                  placeholder={` Search "Products Name" `}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {suggestions?.length > 0 && (
                  <ul className="absolute bg-white top-12 lg:w-[600px] border z-40 h-80 overflow-y-scroll">
                    {suggestions?.map((product) => {
                      return (
                        <Link
                          to={`/product/${product.id}`}
                          key={product.id}
                          className="flex gap-2 p-2 cursor-pointer overflow-y-hidden hover:bg-gray-100 transition-all duration-300"
                        >
                          <li className="rounded-full w-12 h-12 overflow-hidden">
                            <img
                              src={product?.thumbnail?.url}
                              width={"auto"}
                              height={"auto"}
                              alt="image"
                            />
                          </li>
                          <li className=" text-black/70 font-medium text-sm flex items-center">
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
      </div>
    </div>
  );
};

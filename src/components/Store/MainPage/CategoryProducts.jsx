import { useCallback, useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getCategoryFilter,
  getCategoryProduct,
} from "../../../utils/Store/Homepage";
import Container from "../UI/Wrappers/Container.Wrapper";
import CollectionProduct from "../UI/Wrappers/CollectionProduct.Container";
import ProductCard from "../UI/Cards/ProductCard";
import NoDataAnime from "../../Admin/UI/NoDataAnime";
import {
  ProductSkeleton,
  SubCategorySkeletonCard,
} from "../UI/Cards/Skeletons";
import { webState } from "../../../data/webStates";
import { useSnapshot } from "valtio";

const ITEMS_PER_PAGE = 9;

const CategoryProducts = () => {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [subCaregories, setSubCategories] = useState([]);
  const [categoryData, setCategoryData] = useState(null);
  const [showDropdowns, setShowDropdowns] = useState({
    sort: false,
    filter: false,
  });

  const [filterCriteria, setFilterCriteria] = useState({
    priceMax: "",
    priceMin: "",
    sortBy: "",
    sortThrough: "",
  });
  const snap = useSnapshot(webState);
  const navigate = useNavigate();
  const loadingRef = useRef(null);

  // const [showNoProduct, setShowNoProduct] = useState(false);

  // Function to sort products
  const sortProducts = (products, sortType) => {
    return [...products].sort((a, b) => {
      if (sortType === "nameAsc") return a.name.localeCompare(b.name);
      if (sortType === "nameDesc") return b.name.localeCompare(a.name);

      // Extract minimum price from variants
      const getMinPrice = (product) => {
        if (!product.variants || product.variants.length === 0) return 0; // Default to 0 if no variants
        return Math.min(
          ...product.variants.map((v) => parseFloat(v.price) || 0)
        );
      };

      const priceA = getMinPrice(a);
      const priceB = getMinPrice(b);

      if (sortType === "priceHigh") return priceB - priceA; // High to Low
      if (sortType === "priceLow") return priceA - priceB; // Low to High

      return 0;
    });
  };

  const getData = useCallback(
    async (pageNumber, shouldReset = false) => {
      webState.isLoading = true;
      try {
        const data = {
          id: id,
          page: pageNumber,
          size: ITEMS_PER_PAGE,
        };
        const res = await getCategoryProduct(data);
        // console.log(res);
        const newProducts = res?.data?.data?.Product || [];
        setCategoryProduct((prevProducts) =>
          shouldReset || pageNumber === 1
            ? newProducts
            : [...prevProducts, ...newProducts]
        );
        setSubCategories(res?.data?.data?.sub_category?.rows);
        setCategoryData(res?.data?.data?.category);
        setTotalPages(res?.data?.meta?.pagination?.pageCount || 0);
        setShowDropdowns({ sort: false, filter: false });
      } catch (error) {
        console.error("Error fetching category products:", error);
        setCategoryProduct([]);
        setTotalPages(0);
      }
      webState.isLoading = false;
    },
    [id]
  );

  const filterProducts = async (pageNumber = 1) => {
    try {
      const res = await getCategoryFilter({
        id: id,
        page: pageNumber,
        size: ITEMS_PER_PAGE,
        sortThrough: filterCriteria.sortThrough,
        orderBy: filterCriteria.sortBy,
        priceMax: filterCriteria.priceMax,
        priceMin: filterCriteria.priceMin,
      });

      if (res?.status === 200) {
        setCategoryProduct(res?.data?.data?.Product || []);
        setShowDropdowns({ sort: false, filter: false });
        setPage(1);
      }
    } catch (error) {
      console.error("Error filtering products:", error);
      setCategoryProduct([]);
    }
  };

  const toggleDropdown = (type) => {
    setShowDropdowns((prev) => ({
      sort: type === "sort" ? !prev.sort : false,
      filter: type === "filter" ? !prev.filter : false,
    }));
  };

  // Apply sorting when filterCriteria.sortThrough changes
  useEffect(() => {
    setCategoryProduct((prev) =>
      sortProducts(prev, filterCriteria.sortThrough)
    );
  }, [filterCriteria.sortThrough]);

  useEffect(() => {
    setPage(1);
    setCategoryProduct([]);
    setCategoryData(null);
    setFilterCriteria({
      priceMax: "",
      priceMin: "",
      sortBy: "",
      sortThrough: "",
    });
    getData(1, true);
    window.scrollTo(0, 0);
  }, [id, getData]);

  useEffect(() => {
    if (page > 1) {
      getData(page, false);
    }
  }, [page, getData]);

  const loadMoreProducts = () => setPage((prev) => prev + 1);

  const dekstopProductSpan = snap.storeInfo?.product_list_span_desktop;
  const mobileProductSpan = snap.storeInfo?.product_list_span_mobile;

  const subCatNavigate = (id) => {
    console.log(id);
    navigate(`/sub-category/${id}`);
  };

  // Add intersection observer setup
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && !webState.isLoading && page < totalPages) {
          loadMoreProducts();
        }
      },
      { threshold: 1.0 }
    );

    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }

    return () => {
      if (loadingRef.current) {
        observer.unobserve(loadingRef.current);
      }
    };
  }, [page, totalPages, webState.isLoading]);

  return (
    <>
      <CollectionProduct
        show={showDropdowns.sort}
        setShow={(value) =>
          setShowDropdowns((prev) => ({ ...prev, sort: value }))
        }
        filterFor={filterCriteria}
        showFilter={showDropdowns.filter}
        data={categoryData}
        setFilterFor={setFilterCriteria}
        setShowFilter={(value) =>
          setShowDropdowns((prev) => ({ ...prev, filter: value }))
        }
        filterProducts={filterProducts}
        filterDropDownHandler={() => toggleDropdown("filter")}
        SortByDropDownHandler={() => toggleDropdown("sort")}
        subCaregories={subCaregories}
        subCatNavigate={subCatNavigate}
      />

      <Container className="px-0 min-h-[70vh]">
        <div className="flex flex-col gap-10 py-10 w-full">
          {/* {subCaregories?.length > 0 && (
            <div
              className={`w-full overflow-x-scroll ${
                subCaregories?.length > 1
                  ? "pl-2 grid grid-flow-col"
                  : "px-2 flex items-center"
              }  scrollbar-hide gap-2.5 `}
            >
              {subCaregories?.map((data) => {
                return (
                  <div
                    key={data?.id}
                    className="w-full flex bg-white shadow-sm min-w-[145px] border py-2 px-1 rounded-md overflow-hidden flex-col gap-1 items-center "
                  >
                    <img
                      src={data?.thumbnail?.url}
                      alt=""
                      className="h-20 w-20 cursor-pointer object-cover bg-blend-screen"
                      onClick={() => subCatNavigate(data?.id)}
                    />
                    <span className="text-sm">{data?.name}</span>
                  </div>
                );
              })}
            </div>
          )} */}

          {webState.isLoading ? (
            <div className="grid grid-flow-col gap-2.5 overflow-x-scroll scrollbar-hide">
              {[...Array(8)].map((_, index) => (
                <SubCategorySkeletonCard key={index} />
              ))}
            </div>
          ) : (
            subCaregories?.length > 0 && (
              <>
                <div
                  className={`hidden lg:grid grid-cols-6 xl:grid-cols-8 gap-2.5 px-0`}
                >
                  {subCaregories?.map((data) => (
                    <div
                      key={data?.id}
                      className="w-full flex bg-white text-center justify-center shadow-sm min-w-[145px] max-w-[180px] border p-2 rounded-md overflow-hidden flex-col gap-1 items-center "
                    >
                      <img
                        src={data?.thumbnail?.url}
                        alt=""
                        className="h-20 w-20 cursor-pointer object-cover bg-blend-screen"
                        onClick={() => subCatNavigate(data?.id)}
                      />
                      <span className="text-sm flex w-full h-full items-center justify-center text-center">
                        {data?.name}
                      </span>
                    </div>
                  ))}
                </div>
                <div
                  className={`flex lg:hidden overflow-x-scroll scrollbar-hide gap-2.5 max-w-max px-2`}
                >
                  {subCaregories?.map((data) => (
                    <div
                      key={data?.id}
                      className="w-full flex bg-white text-center justify-center shadow-sm min-w-[145px] max-w-[180px] border p-2 rounded-md overflow-hidden flex-col gap-1 items-center "
                    >
                      <img
                        src={data?.thumbnail?.url}
                        alt=""
                        className="h-20 w-20 cursor-pointer object-cover bg-blend-screen"
                        onClick={() => subCatNavigate(data?.id)}
                      />
                      <span className="text-sm flex w-full h-full items-center justify-center text-center">
                        {data?.name}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )
          )}
          {/* <hr /> */}
          <div className="w-full flex flex-col gap-1">
            <div className="flex justify-end w-full px-2">
              <select
                className="border !border-[#6b7280] min-w-[125px] !ring-0 p-2 rounded-md text-sm"
                value={filterCriteria.sortThrough}
                onChange={(e) =>
                  setFilterCriteria((prev) => ({
                    ...prev,
                    sortThrough: e.target.value,
                  }))
                }
              >
                <option value="">Sort By</option>
                <option value="nameAsc">A-Z</option>
                <option value="nameDesc">Z-A</option>
                <option value="priceHigh">High to Low</option>
                <option value="priceLow">Low to High</option>
              </select>
            </div>
            <div className="w-full flex items-center justify-center">
              {categoryProduct?.length > 0 ? (
                <div className="w-full flex flex-col gap-2">
                  <div
                    className={`w-full grid grid-cols-${
                      mobileProductSpan || 2
                    } lg:grid-cols-${
                      dekstopProductSpan || 3
                    } gap-3 lg:gap-5 my-3 place-items-center`}
                  >
                    {categoryProduct?.map((item, index) => (
                      <div
                        key={item?.id}
                        className="w-full"
                        style={{
                          animation: `zoomIn 0.5s ease-out ${(index % 9) * 0.1}s forwards`,
                          opacity: 0,
                        }}
                      >
                        <ProductCard product={item} />
                      </div>
                    ))}
                  </div>
                  {totalPages > 1 && page < totalPages && (
                    <div 
                      ref={loadingRef}
                      className="flex items-center justify-center w-full mb-4"
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
        </div>
      </Container>
    </>
  );
};

export default CategoryProducts;

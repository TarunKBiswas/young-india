/* eslint-disable react/prop-types */
// import SortByDropDown from "../../Search/SortByDropDown";
// import FilterCategories from "../FilterCategories";

// import { BiFilter } from "react-icons/bi";
import Container from "./Container.Wrapper";

const CollectionProduct = ({
  data,
  // filterDropDownHandler,
  // SortByDropDownHandler,
  // showFilter,
  // setShowFilter,
  // filterFor,
  // filterProducts,
  // setFilterFor,
  // show,
  // setShow,
}) => {
  return (
    <div className="w-full flex flex-col items-center lg:flex-row lg:justify-between bg-themecolor h-40">
      <Container className={"h-full"}>
        <div className="w-full text-center flex h-full items-center justify-center">
          <div className="text-2xl font-semibold text-textcolor capitalize my-2 ">
            {data?.name}
          </div>

          {/* <div className="w-full flex item-center justify-end gap-5 md:w-auto ">
            <div className="flex flex-col items-center justify-center gap-1 relative text-black/80 ">
              <div
                className="flex items-center gap-1 cursor-pointer "
                onClick={filterDropDownHandler}
              >
                <BiFilter className="h-5 w-5" />
                <span className="text-sm">Filter By</span>
              </div>
              <div className="flex items-start cursor-pointer">
                {showFilter ? (
                  <FilterCategories
                    showFilter={showFilter}
                    setShowFilter={setShowFilter}
                    dropDownFilterFor={filterFor}
                    searchFilter={() => filterProducts()}
                    setDropDrownFilterFor={setFilterFor}
                    setShow={false}
                  />
                ) : null}
              </div>
            </div> */}

          {/* Sort by  */}
          {/* <div className="flex flex-col items-center justify-center gap-1 relative text-black/80 ">
          <div
          className="flex items-center gap-1 cursor-pointer"
          onClick={SortByDropDownHandler}
          >
          <BiSort className="h-4 w-4" />
          <span className="text-sm">Sort By</span>
          </div>
          <div className="flex items-start absolute cursor-pointer mr-32 lg:mr-0">
          {show ? (
            <SortByDropDown
            showFilter={false}
            show={show}
            setShow={setShow}
            dropDownFilterFor={filterFor}
            searchFilter={() => filterProducts()}
            setDropDrownFilterFor={setFilterFor}
            />
            ) : null}
            </div>
            </div> */}
          {/* </div> */}
        </div>
      </Container>
    </div>
  );
};

export default CollectionProduct;

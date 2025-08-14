/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategoryListing } from "../../../utils/categoryAPI.js";
import { state } from "../../../data/state.js";
import { useSnapshot } from "valtio";
import CreateButton from "../UI/Buttons/CreateButton.jsx";
import { TBody, TD, TH, THead, TR, XTable } from "../UI/Table/XTable.jsx";
import CategoryInfoCard from "./CategoryInfoCard.jsx";
import SearchInput from "../UI/SearchInput.jsx";
import Actions from "../UI/Actions.jsx";
import OutletWrapper from "../../../Pages/OutletWrapper.jsx";

const CategoryList = () => {
  const [category, setCategory] = useState([]);
  const [search, setSearch] = useState("");
  // const [pagination, setPagination] = useState({
  //   currentPage: 1,
  //   dataPerPage: 25,
  //   totalData: 0,
  //   totalPage: 0,
  // });

  const navigate = useNavigate();
  const snap = useSnapshot(state);

  const getCategory = async () => {
    try {
      const res = await getCategoryListing();
      setCategory(res?.data?.data);
      // setPagination({
      //   ...pagination,
      //   page: res?.data?.meta?.pagination?.page,
      //   pageSize: res?.data?.meta?.pagination?.pageSize,
      //   pageCount: res?.data?.meta?.pagination?.pageCount,
      //   total: res?.data?.meta?.pagination?.total,
      // });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategory();
    state.refreshCategoryList = false;
  }, [snap.refreshCategoryList]);

  const catDetailsHandler = (id) => {
    state.selectedCatID = id;
    navigate(`${id}`);
  };

  const deleteCategoryHandler = (id) => {
    state.selectedCatID = id;
    state.showDeleteCategoryModal = true;
  };

  const searchHandler = async (search) => {
    try {
      const res = await getCategoryListing(search);
      setCategory(res?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const categoryEditHandler = (id) => {
    state.selectedCatID = id;
    state.showEditCategoryModal = true;
  };

  const addCategoryHandler = () => {
    state.showCreateCategoryModal = true;
  };

  return (
    <OutletWrapper>
      <div className="w-full flex items-center justify-between pb-4 pt-2">
        <span className="text-2xl font-semibold">Categories</span>
        <div className="max-w-2xl flex gap-3">
          <div className="hidden lg:flex">
            <SearchInput
              search={search}
              setSearch={setSearch}
              handler={searchHandler}
            />
          </div>
          <div>
            <CreateButton action={addCategoryHandler} title={"Create New"} />
          </div>
        </div>
      </div>

      {category?.length > 0 && (
        <XTable>
          <THead>
            <TR>
              <TH>ID</TH>
              <TH>Image</TH>
              <TH>Name</TH>
              <TH>Products</TH>
              <TH>Sub Categories</TH>
              <TH>Options</TH>
            </TR>
          </THead>
          <TBody>
            {category?.map((cat, i) => {
              return (
                <TR key={i}>
                  <TD>{cat?.id}</TD>
                  <TD>
                    <CategoryInfoCard
                      cat={cat}
                      catDetailsHandler={catDetailsHandler}
                    />
                  </TD>
                  <TD>
                    <span className="capitalize">{cat?.name}</span>
                  </TD>
                  <TD>{cat?.products}</TD>
                  <TD>{cat?.sub_categories}</TD>
                  <TD>
                    <Actions
                      data={cat}
                      deleteHandler={deleteCategoryHandler}
                      editHandler={categoryEditHandler}
                    />
                  </TD>
                </TR>
              );
            })}
          </TBody>
        </XTable>
      )}
    </OutletWrapper>
  );
};

export default CategoryList;

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { state } from "../../../data/state.js";
import { useSnapshot } from "valtio";
import { getSubCategoryListing } from "../../../utils/categoryAPI.js";
import { TBody, TD, TH, THead, TR, XTable } from "../UI/Table/XTable.jsx";
import CategoryInfoCard from "./CategoryInfoCard.jsx";
import Actions from "../UI/Actions.jsx";
import NoDataAnime from "../UI/NoDataAnime.jsx";
import OutletWrapper from "../../../Pages/OutletWrapper.jsx";
import CreateButton from "../UI/Buttons/CreateButton.jsx";

const CategoryDetails = () => {
  const param = useParams();
  const [pId] = useState(param.id);
  const [subCat, setSubCat] = useState([]);

  const snap = useSnapshot(state);
  const id = snap.selectedCatID;

  const getSubCategories = async () => {
    try {
      const res = await getSubCategoryListing(pId);

      if (res?.status === 200) {
        setSubCat(res?.data?.data?.subCategories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSubCategories();
    state.refreshSubCategoryList = false;
  }, [snap.refreshSubCategoryList]);

  const addSubCatHandler = (id) => {
    state.selectedCatID = id;
    state.showAddSubCategoryModal = true;
  };

  const subCatDeleteHandler = (id) => {
    state.selectedSubCatID = id;
    state.showDeleteSubCategoryModal = true;
  };

  return (
    <OutletWrapper>
      <div className="w-full flex items-center justify-between pb-4 pt-2">
        <span className="text-2xl font-semibold">Sub Categories</span>
        <div className="max-w-2xl flex gap-3">
          <CreateButton
            action={() => addSubCatHandler(id)}
            title={"Create New"}
          />
        </div>
      </div>

      {subCat?.length > 0 ? (
        <XTable>
          <THead>
            <TR>
              <TH>ID</TH>
              <TH>Image</TH>
              <TH>Name</TH>
              <TH>Action</TH>
            </TR>
          </THead>

          <TBody>
            {subCat?.map((cat) => (
              <TR key={cat?.id}>
                <TD>{cat?.id}</TD>
                <TD>
                  <CategoryInfoCard cat={cat} />
                </TD>
                <TD>{cat?.name}</TD>
                <TD>
                  <Actions data={cat} deleteHandler={subCatDeleteHandler} />
                </TD>
              </TR>
            ))}
          </TBody>
        </XTable>
      ) : (
        <div className="w-full flex items-center justify-center">
          <NoDataAnime msg={"No Subcategory Found"} />
        </div>
      )}
    </OutletWrapper>
  );
};

export default CategoryDetails;

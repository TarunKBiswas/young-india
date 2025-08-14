/* eslint-disable react-hooks/exhaustive-deps */
// import { useState } from "react";
import { state } from "../../../../data/state.js";
// import { searchCollections } from "../../../../utils/collectionsAPI.js";
// import { useNavigate } from "react-router-dom";
import { useSnapshot } from "valtio";
import CreateButton from "../../UI/Buttons/CreateButton.jsx";
import { TBody, TD, TH, THead, TR, XTable } from "../../UI/Table/XTable.jsx";
// import SearchInput from "../../UI/SearchInput.jsx";
import Actions from "../../UI/Actions.jsx";
import PaginationContainer from "../../UI/PaginationContainer.jsx";
import CategoryInfoCard from "../../Category/CategoryInfoCard.jsx";
import NoDataAnime from "../../UI/NoDataAnime.jsx";

const CollectionListing = () => {
  // const [search, setSearch] = useState("");

  // const navigate = useNavigate();
  const snap = useSnapshot(state);
  const collections = snap.collections;
  const pagination = snap.collectionsPagination;

  const deleteColHandler = (id) => {
    state.selectedColID = id;
    state.showDeleteCollectionModal = true;
  };

  const editCollectionHandler = async (id) => {
    state.selectedColID = id;
    state.showEditCollectionModal = true;
  };

  const getPrevPage = () => {
    if (pagination.currentPage > 1) {
      state.collectionsPagination = {
        ...pagination,
        currentPage: pagination.currentPage - 1,
      };
    }
  };

  const getNextPage = () => {
    if (pagination.currentPage < pagination.totalPage) {
      state.collectionsPagination = {
        ...pagination,
        currentPage: pagination.currentPage + 1,
      };
    }
  };

  const addCollectionHandler = () => {
    state.showAddCollectionModal = true;
  };

  return (
    <>
      <div className="px-2 mt-[-55px]">
        <div className="w-full flex items-center justify-between pb-4 pt-2">
          <span
            className="text-black
           text-2xl font-semibold"
          ></span>
          <div className="max-w-2xl flex gap-3 mt-16 lg:mt-0">
            <div>
              <CreateButton
                action={addCollectionHandler}
                title={"Add Collection"}
              />
            </div>
          </div>
        </div>

        {collections?.length > 0 ? (
          <XTable>
            <THead>
              <TR>
                <TH>ID</TH>
                <TH>Image</TH>
                <TH>Name</TH>
                <TH>Products</TH>
                <TH>Actions</TH>
              </TR>
            </THead>
            <TBody>
              {collections?.map((col) => (
                <TR key={col?.id}>
                  <TD>{col?.id}</TD>
                  <TD>
                    <CategoryInfoCard cat={col} />
                  </TD>
                  <TD style={"font-medium"}> {col?.name}</TD>
                  <TD style="text-start font-medium">{col?.products}</TD>
                  <TD>
                    <Actions
                      data={col}
                      deleteHandler={deleteColHandler}
                      editHandler={editCollectionHandler}
                    />
                  </TD>
                </TR>
              ))}
            </TBody>
          </XTable>
        ) : (
          <NoDataAnime msg={"No Collection Found"} />
        )}
      </div>

      {collections?.length > 0 && (
        <PaginationContainer
          pagination={pagination}
          getNextPage={getNextPage}
          getPrevPage={getPrevPage}
        />
      )}
    </>
  );
};

export default CollectionListing;

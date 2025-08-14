/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { state } from "../../../../data/state.js";
import { getStaticCollection } from "../../../../utils/staticCollection.js";
import { useNavigate } from "react-router-dom";
import { useSnapshot } from "valtio";
import { TBody, TD, TH, THead, TR, XTable } from "../../UI/Table/XTable.jsx";
import ProductPopUp from "./ProductPopUp.jsx";
import Actions from "../../UI/Actions.jsx";
import NoDataAnime from "../../UI/NoDataAnime.jsx";

const StaticCollectionListing = () => {
  const [staticCollections, setStaticCollections] = useState([]);
  const naviget = useNavigate();
  const snap = useSnapshot(state);

  const getData = async () => {
    try {
      const res = await getStaticCollection();
      setStaticCollections(res?.data?.data);
    } catch (error) {}
  };

  useEffect(() => {
    getData();
    state.refreshStaticCollctionList = false;
  }, [snap.refreshStaticCollctionList]);

  const colletionDetails = (id) => {
    naviget(`${id}`);
  };

  const editModalHandler = (id) => {
    state.selectedStaticCollID = id;
    state.showEditStaticCollModal = true;
  };

  return (
    <>
      <div className=" px-2 mt-[20px]">
        {staticCollections?.length > 0 && (
          <XTable>
            <THead>
              <TR>
                <TH>ID</TH>
                <TH>Tag</TH>
                <TH>Product</TH>
                <TH>Actions</TH>
              </TR>
            </THead>
            <TBody>
              {staticCollections?.map((col) => (
                <TR key={col?.id}>
                  <TD>{col?.id}</TD>
                  <TD>{col?.attributes?.tag}</TD>
                  <TD>
                    <ProductPopUp data={col} />
                  </TD>
                  <TD>
                    <Actions
                      data={col}
                      detailsHandler={colletionDetails}
                      editHandler={editModalHandler}
                    />
                  </TD>
                </TR>
              ))}
            </TBody>
          </XTable>
        )}
      </div>
    </>
  );
};

export default StaticCollectionListing;

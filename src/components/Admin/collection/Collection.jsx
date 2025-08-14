/* eslint-disable react-hooks/exhaustive-deps */
import CollectionListing from "./collections/CollectionListing.jsx";
import { useSnapshot } from "valtio";
import { state } from "../../../data/state.js";
import { getCollectionListing } from "../../../utils/collectionsAPI.js";
import { useEffect } from "react";
import OutletWrapper from "../../../Pages/OutletWrapper.jsx";

const Collection = () => {
  const snap = useSnapshot(state);
  const pagination = snap.collectionsPagination;

  const getAllCollections = async () => {
    try {
      const res = await getCollectionListing();
      if (res?.status === 200) {
        state.collections = res?.data?.data;
        state.collectionsPagination = {
          ...pagination,
          page: res?.data?.meta?.pagination?.page,
          pageSize: res?.data?.meta?.pagination?.pageSize,
          pageCount: res?.data?.meta?.pagination?.pageCount,
          total: res?.data?.meta?.pagination?.total,
        };
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCollections();
    state.refreshCollectionTable = false;
  }, [snap.refreshCollectionTable]);

  return (
    <OutletWrapper>
      <div className="w-full flex items-start justify-between flex-col">
        <span className="text-black text-2xl font-semibold">Collection</span>
        <div className="w-full sm:px-0 mt-4">
          <CollectionListing />
        </div>
      </div>
    </OutletWrapper>
  );
};

export default Collection;

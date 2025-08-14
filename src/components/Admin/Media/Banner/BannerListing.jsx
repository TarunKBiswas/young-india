/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { state } from "../../../../data/state.js";
import { getBannersList } from "../../../../utils/Banners.js";
import { useSnapshot } from "valtio";
import CreateButton from "../../UI/Buttons/CreateButton.jsx";
import { TBody, TD, TH, THead, TR, XTable } from "../../UI/Table/XTable.jsx";
import BannerInfo from "./BannerInfo.jsx";
import Actions from "../../UI/Actions.jsx";
import NoDataAnime from "../../UI/NoDataAnime.jsx";

const BannerListing = () => {
  const [bannerList, setBannerList] = useState([]);

  const snap = useSnapshot(state);

  const getBanners = async () => {
    let res = await getBannersList();
    // console.log(res);
    if (res?.status === 200) {
      setBannerList(res?.data?.data);
    }
  };

  useEffect(() => {
    getBanners();
    state.refreshBannersList = false;
  }, [snap.refreshBannersList]);

  const editBannerHandler = (id) => {
    state.selectedBannerID = id;
    state.showEditBannerModal = true;
  };

  const deleteBannerHandler = (id) => {
    state.selectedBannerID = id;
    state.showDeleteBannerModal = true;
  };

  const modalHandler = () => {
    state.showAddBannerModal = true;
  };

  return (
    <>
      <div className=" px-2 mt-[-55px]">
        <div className="w-full flex items-center justify-between pb-4 pt-2 mt-16 lg:mt-0">
          <span className="text-black text-2xl font-semibold"></span>
          <CreateButton action={modalHandler} title={"Add New"} />
        </div>

        {bannerList?.length > 0 ? (
          <XTable>
            <THead>
              <TR>
                <TH>ID</TH>
                <TH>Desktop Banner</TH>
                <TH>Mobile Banner</TH>
                <TH>Type</TH>
                <TH>Action</TH>
              </TR>
            </THead>
            <TBody>
              {bannerList?.map((banner) => (
                <TR key={banner?.id}>
                  <TD>{banner?.id}</TD>
                  <TD>
                    <BannerInfo
                      data={banner?.desktop_thumbnail?.url}
                      type={"desktop"}
                    />
                  </TD>
                  <TD>
                    <BannerInfo
                      data={banner?.mobile_thumbnail?.url}
                      type={"mobile"}
                    />
                  </TD>
                  <TD>{banner?.type}</TD>
                  <TD>
                    <Actions
                      data={banner}
                      deleteHandler={deleteBannerHandler}
                      editHandler={editBannerHandler}
                    />
                  </TD>
                </TR>
              ))}
            </TBody>
          </XTable>
        ) : (
          <NoDataAnime msg={"No Banners Found"} />
        )}
      </div>
    </>
  );
};

export default BannerListing;

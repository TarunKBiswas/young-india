/* eslint-disable react-hooks/exhaustive-deps */
import moment from "moment";
import { useSnapshot } from "valtio";
import { BsTrash } from "react-icons/bs";
import { useEffect, useState } from "react";
import { state } from "../../../../data/state.js";
import CreateButton from "../../UI/Buttons/CreateButton.jsx";
import { getCampaignList } from "../../../../utils/campaigns.js";
import { TBody, TD, TH, THead, TR, XTable } from "../../UI/Table/XTable.jsx";
import NoDataAnime from "../../UI/NoDataAnime.jsx";

const CampaignListing = () => {
  const [campaignList, setCampaignList] = useState(null);
  const snap = useSnapshot(state);

  const getCampaign = async () => {
    try {
      let res = await getCampaignList();

      if (res?.status === 200) {
        setCampaignList(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCampaign();
    state.refreshCampaignList = false;
  }, [snap.refreshCampaignList]);

  const deleteCampainHandler = (id) => {
    state.selectedCampaignID = id;
    state.showDeleteCampaignModal = true;
  };

  const createCampaignHandler = () => {
    state.showCreateCampaignModal = true;
  };

  return (
    <div className="px-2 mt-[-55px] ">
      <div className="w-full flex items-center justify-end pb-4 pt-2 mt-16 lg:mt-0">
        <CreateButton action={createCampaignHandler} title={"Create New"} />
      </div>

      {campaignList?.length > 0 ? (
        <XTable>
          <THead>
            <TR>
              <TH>Image</TH>
              <TH>Title</TH>
              <TH>Body</TH>
              <TH>Type</TH>
              <TH>Time</TH>
              <TH>Action</TH>
            </TR>
          </THead>
          <TBody>
            {campaignList?.map((camp) => (
              <TR key={camp?.id}>
                <TD>
                  <div>
                    <img
                      src={camp?.image_url}
                      className="rounded-full h-16 w-16 object-cover"
                      width={"auto"}
                      height={"auto"}
                      alt="image"
                    />
                  </div>
                </TD>
                <TD>{camp?.notification_title}</TD>
                <TD>{camp?.notification_body}</TD>
                <TD>{camp?.type}</TD>
                <TD>{moment(camp?.createdAt).format("DD MMM YYYY")}</TD>
                <TD>
                  <BsTrash
                    className="h-4 w-4 cursor-pointer text-red-500 hover:scale-125 transition-all duration-300"
                    onClick={() => deleteCampainHandler(camp?.id)}
                  />
                </TD>
              </TR>
            ))}
          </TBody>
        </XTable>
      ) : (
        <NoDataAnime msg={"No Campaign Found"} />
      )}
    </div>
  );
};

export default CampaignListing;

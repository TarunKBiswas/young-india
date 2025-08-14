/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { state } from "../../../../data/state.js";
import { uploadImage } from "../../../../utils/const_API.js";
import { getSingleBanner, updateBanner } from "../../../../utils/Banners.js";
import { FailureAlert, SuccessAlert } from "../../../Toast.jsx";
import { useSnapshot } from "valtio";
import MediaInputUpdate from "../../UI/Inputs/MediaInputUpdate.jsx";
import SimpleModal from "../../Modals/SimpleModal.jsx";

const EditBannerModal = () => {
  const [bannerDetails, setBanerDetails] = useState(null);
  const [mobile_banner, setMobileBanner] = useState(null);
  const [desktop_banner, setDesktopBanner] = useState(null);
  const [type, setType] = useState(null);
  const [collections, setCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [newCollection, setNewCollection] = useState(null);

  const snap = useSnapshot(state);
  const id = snap.selectedBannerID;

  const getBannerDetails = async () => {
    try {
      let res = await getSingleBanner(id);
      // console.log(res);
      if (res?.status === 200) {
        setBanerDetails(res?.data?.data);
        setType(res?.data?.data?.type);
        setCollections(res?.data?.collections);
        setSelectedCollection(res?.data?.selectedCollection);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (bannerDetails === null) {
      getBannerDetails();
    }
  }, [bannerDetails]);

  const updateBannerHandler = async () => {
    showModalHandler();
    state.isLoading = true;
    try {
      const bannerUploads = [];
      const fData = {};
      if (desktop_banner !== null) {
        let formdata = new FormData();
        formdata.append("file", desktop_banner);
        bannerUploads.push(uploadImage(formdata));
      }
      if (mobile_banner !== null) {
        let formdata = new FormData();
        formdata.append("file", mobile_banner);
        bannerUploads.push(uploadImage(formdata));
      }
      const uploadResults = await Promise.all(bannerUploads);
      if (uploadResults[0]?.status === 200) {
        fData.DesktopThumbnailId = uploadResults[0].data[0].id;
      }
      if (uploadResults[1]?.status === 200) {
        fData.MobileThumbnailId = uploadResults[1].data[0].id;
      }
      if (type) {
        fData.type = type;
      }
      if (newCollection) {
        fData.data = +newCollection;
      }

      console.log(fData);

      const res3 = await updateBanner(id, fData);

      if (res3?.status === 200) {
        state.refreshBannersList = true;
        SuccessAlert("Banner updated successfully");
      }
    } catch (error) {
      console.log(error);
      FailureAlert("Something went wrong");
    }
    state.isLoading = false;
  };

  const showModalHandler = () => {
    state.showEditBannerModal = false;
  };

  return (
    <SimpleModal title={"Edit Banner"} closeModalHandler={showModalHandler} modalSize={"max-w-2xl"}>
      <div className="w-full flex flex-col gap-3 p-6">
        <MediaInputUpdate
          style={"flex-col gap-1"}
          label={"Desktop Banner"}
          state={desktop_banner}
          setState={setDesktopBanner}
          image={bannerDetails?.desktop_thumbnail?.url}
        />
        <MediaInputUpdate
          style={"flex-col gap-1"}
          label={"Mobile Banner"}
          state={mobile_banner}
          setState={setMobileBanner}
          image={bannerDetails?.mobile_thumbnail?.url}
        />
        <div className="grid w-full md:grid-cols-2 gap-5">
          <div className="w-full flex flex-col gap-1">
            <label>
              Collection<span className="text-red-500">*</span>
            </label>
            <select
              className="w-full capitalize !border-gray-200 rounded !ring-0 !outline-none"
              onChange={(e) => setNewCollection(e.target.value)}
              value={selectedCollection?.id || ""}
            >
              <option value="">Select Collection</option>
              {collections?.map((coll) => (
                <option value={coll?.id} key={coll?.id}>
                  {coll?.name}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full flex flex-col gap-1">
            <label>
              Type<span className="text-red-500">*</span>
            </label>
            <select
              className="w-full !border-gray-200 rounded !ring-0 !outline-none"
              onChange={(e) => setType(e.target.value)}
              value={type || ""}
            >
              <option value="HEADER">Header</option>
              <option value="SEPARATOR">Separator</option>
            </select>
          </div>
        </div>

        <div className="w-full flex items-center justify-end">
          <button className="submitButton" onClick={updateBannerHandler}>
            Submit
          </button>
        </div>
      </div>
    </SimpleModal>
  );
};

export default EditBannerModal;

import { useEffect, useState } from "react";
import { state } from "../../../../data/state.js";
import { uploadImage } from "../../../../utils/const_API.js";
import { createBanner } from "../../../../utils/Banners.js";
import { FailureAlert, SuccessAlert } from "../../../Toast.jsx";
import { getCollections } from "../../../../utils/collectionsAPI.js";
import MediaInput from "../../UI/Inputs/MediaInput.jsx";
import SimpleModal from "../../Modals/SimpleModal.jsx";

const CreateBannerModal = () => {
  const [phoneBanner, setPhoneBanner] = useState(null);
  const [desktopBanner, setDesktopBanner] = useState(null);
  const [collections, setCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [type, setType] = useState("HEADER");

  const getColectionData = async () => {
    try {
      let res = await getCollections();
      if (res?.status === 200) {
        setCollections(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getColectionData();
  }, []);

  const createBannerHandler = async () => {
    if (!phoneBanner) {
      FailureAlert("Phone Banner is required");
      return;
    }

    if (!desktopBanner) {
      FailureAlert("Desktop Banner is required");
      return;
    }

    // console.log(collections);
    try {
      closeModalHandler();
      state.isLoading = true;
      let formdata = new FormData();
      formdata.append("file", phoneBanner);
      let res = await uploadImage(formdata);
      if (res?.status === 200) {
        let MobileThumbnailId = res?.data[0]?.id;
        let formdata = new FormData();
        formdata.append("file", desktopBanner);
        let res2 = await uploadImage(formdata);
        if (res2?.status === 200) {
          let DesktopThumbnailId = res2?.data[0]?.id;
          let finalData = {
            MobileThumbnailId,
            DesktopThumbnailId,
            action: "COLLECTION",
            data: String(selectedCollection || collections[0]?.id),
            type,
          };
          // console.log(finalData);
          let res3 = await createBanner(finalData);
          if (res3?.status === 200) {
            state.refreshBannersList = true;
            SuccessAlert("Banner Created");
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
    state.isLoading = false;
  };

  const closeModalHandler = () => {
    state.showAddBannerModal = false;
  };

  return (
    <SimpleModal closeModalHandler={closeModalHandler} title={"Create Banner"} modalSize={"max-w-2xl"}>
      <div className="p-6 flex flex-col gap-6 ">
        <MediaInput
          label={"Desktop Banner"}
          required
          image={desktopBanner}
          setImage={setDesktopBanner}
          recSize={"1900 X 600px OR 2 : 1"}
          style={"w-full flex flex-col gap-1"}
        />

        <MediaInput
          label={"Mobile Banner"}
          required
          image={phoneBanner}
          setImage={setPhoneBanner}
          recSize={"1000 X 1150px OR 1 : 2"}
          style={"w-full flex flex-col gap-1"}
        />

        <div className="grid w-full md:grid-cols-2 gap-5">
          <div className="w-full flex flex-col gap-1">
            <label>
              Collection<span className="text-red-500">*</span>
            </label>
            <select
              className="w-full !border-gray-200 rounded !ring-0 !outline-none"
              value={selectedCollection || ""}
              onChange={(e) => setSelectedCollection(e.target.value)}
            >
              <option value="">
                Select Collection
              </option>
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
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="HEADER">Header</option>
              <option value="SEPARATOR">Separator</option>
            </select>
          </div>
        </div>

        <div className="w-full flex items-center justify-end">
          <button className="submitButton" onClick={createBannerHandler}>
            Submit
          </button>
        </div>
      </div>
    </SimpleModal>
  );
};

export default CreateBannerModal;

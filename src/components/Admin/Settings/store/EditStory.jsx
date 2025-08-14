/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { SuccessAlert } from "../../../Toast";
import { state } from "../../../../data/state";
import DataDropDown from "../../UI/DataDropDown";
import SimpleModal from "../../Modals/SimpleModal";
import { uploadImage } from "../../../../utils/const_API";
import EditVideoInput from "../../UI/Inputs/EditVideoInput";
import { getSingleStory, updateStory } from "../../../../utils/stories";

const EditStory = ({ setShowEditModal, products, id }) => {
  const [video, setVideo] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [details, setDetails] = useState(null);

  const getData = async (id) => {
    try {
      let res = await getSingleStory(id);

      setDetails(res?.data?.data);
      setSelectedProduct(res?.data?.data?.products[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData(id);
  }, [id]);

  const closeModalHandler = () => {
    setShowEditModal(false);
  };

  const submitHandler = async () => {
    let data = { products: [selectedProduct?.id || products[0]?.id] };
    // closeModalHandler();

    const uploadFile = async (file) => {
      const formdata = new FormData();
      formdata.append("file", file);
      return await uploadImage(formdata);
    };

    try {
      if (video !== null) {
        let videoRes = await uploadFile(video);
        if (videoRes?.status === 200) {
          data.VideoId = videoRes.data[0]?.id;
          let storyRes = await updateStory(id, data);
          if (storyRes?.status === 200) {
            state.refreshStoryList = true;
            SuccessAlert("Story updated");
          }
        }
      } else {
        data.VideoId = details?.video?.id;

        let storyRes = await updateStory(id, data);
        if (storyRes?.status === 200) {
          state.refreshStoryList = true;
          SuccessAlert("Story created");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  return (
    <SimpleModal closeModalHandler={closeModalHandler} modalSize={"max-w-2xl"}>
      <div className="w-full flex flex-col gap-4 p-4">
        <div className="w-full flex items-center ">
          <label className="col-sm-3 font-medium">
            Product<span className="text-red-500">*</span>
          </label>
          <div className="w-full">
            <DataDropDown
              data={products}
              selected={selectedProduct}
              setSelected={setSelectedProduct}
            />
          </div>
        </div>

        <EditVideoInput
          prevVideo={details?.video?.url}
          video={video}
          setVideo={setVideo}
          label={"Video"}
          required
        />

        <div className="w-full flex items-center justify-end ">
          <button className="submitButton" onClick={submitHandler}>
            Submit
          </button>
        </div>
      </div>
    </SimpleModal>
  );
};

export default EditStory;

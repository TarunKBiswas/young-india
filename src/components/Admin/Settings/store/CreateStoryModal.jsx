import { useEffect, useState } from "react";
import SimpleModal from "../../Modals/SimpleModal";
import VideoInput from "../../UI/Inputs/VideoInput";
import { state } from "../../../../data/state";
import { listAllProducts } from "../../../../utils/productsAPI";
import DataDropDown from "../../UI/DataDropDown";
import { createStory } from "../../../../utils/stories";
import { uploadImage } from "../../../../utils/const_API";
import { SuccessAlert } from "../../../Toast";

const CreateStoryModal = () => {
  const [video, setVideo] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const getProducts = async () => {
    try {
      const res = await listAllProducts();
      if (res?.status === 200) {
        setProducts(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const closeModalHandler = () => {
    state.showAddStoryModal = false;
  };

  const submitHandler = async () => {
    try {
      let data = { products: [selectedProduct?.id] };
      closeModalHandler();

      const uploadFile = async (file) => {
        const formdata = new FormData();
        formdata.append("file", file);
        return await uploadImage(formdata);
      };

      let videoRes = await uploadFile(video);
      if (videoRes?.status === 200) {
        data.VideoId = videoRes.data[0]?.id;

        let storyRes = await createStory(data);
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
    <SimpleModal closeModalHandler={closeModalHandler} modalSize={"max-w-xl"}>
      <div className="w-full flex flex-col gap-4 p-4">
        <div className="w-full flex flex-col gap-1 font-medium">
          <label>
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
        <VideoInput
          video={video}
          setVideo={setVideo}
          label={"Video"}
          required
          style={"w-full flex flex-col gap-1  text-base"}
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

export default CreateStoryModal;

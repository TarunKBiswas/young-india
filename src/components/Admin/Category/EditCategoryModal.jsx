/* eslint-disable react-hooks/exhaustive-deps */
import SimpleModal from "../Modals/SimpleModal";

import { useSnapshot } from "valtio";
import { state } from "../../../data/state.js";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";
import {
  reqMsg,
  thankyouModalHandler,
  uploadImage,
  resizeFile, // Importing resize function
} from "../../../utils/const_API.js";
import {
  getSingleCatDetails,
  updateCategory,
} from "../../../utils/categoryAPI.js";
import { FailureAlert } from "../../Toast.jsx";
import { useNavigate } from "react-router-dom";
import MediaInputUpdate from "../UI/Inputs/MediaInputUpdate.jsx";
import InputComp2 from "../UI/Inputs/InputComp2.jsx";

const schema = yup.object({
  name: yup.string().required(reqMsg),
});

const EditCategoryModal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: async () => await getCatInfo(),
  });

  const [catInfo, setCatInfo] = useState(null);
  const [newThumbnail, setNewThumbnail] = useState(null);
  const snap = useSnapshot(state);
  const id = snap.selectedCatID;
  const navigate = useNavigate();

  const getCatInfo = async () => {
    try {
      let res = await getSingleCatDetails(id);
      if (res?.status === 200) {
        setCatInfo(res?.data?.data?.category);
        return res?.data?.data?.attributes;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCatInfo();
  }, []);

  // Image Validation Function
  const validateImage = async (file) => {
    if (!file) return;

    // Validate File Size (≤ 1MB)
    const fileSize = file.size / 1024 / 1024; // Convert bytes to MB
    if (fileSize > 1) {
      FailureAlert("File size must be less than or equal to 1MB");
      return;
    }

    // Validate Aspect Ratio (16:9)
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = async () => {
      const aspectRatio = img.width / img.height;
      if (Math.abs(aspectRatio - 16 / 9) > 0.01) {
        FailureAlert("Image must be in 16:9 ratio");
        return;
      }

      // Resize Image and Set Thumbnail
      const resizedImage = await resizeFile(file);
      setNewThumbnail(resizedImage);
    };
  };

  const updateProductHandler = async (data) => {
    let imageID = catInfo?.attributes?.thumbnail?.data?.id;
    closeModalHandler();
    state.isLoading = true;
    try {
      if (newThumbnail !== null) {
        const formdata = new FormData();
        formdata.append("file", newThumbnail);
        let res = await uploadImage(formdata);
        if (res?.status === 200) {
          let fData = {
            ...data,
            ThumbnailId: res?.data[0]?.id,
          };
          const editCategory = await updateCategory(id, fData);
          if (editCategory?.status === 200) {
            navigate("/categories");
            state.refreshCategoryList = true;
          }
        }
      } else {
        let fData = { ...data, ThumbnailId: imageID };
        const editCategory = await updateCategory(id, fData);
        if (editCategory?.status === 200) {
          thankyouModalHandler();
          state.refreshCategoryList = true;
          closeModalHandler();
        }
      }
    } catch (error) {
      console.log(error);
      FailureAlert("Something went wrong");
    } finally {
      state.isLoading = false;
    }
  };

  const closeModalHandler = () => {
    state.showEditCategoryModal = false;
  };

  return (
    <SimpleModal modalSize={"max-w-xl"} closeModalHandler={closeModalHandler}>
      <form
        className="flex flex-col gap-4 p-6"
        onSubmit={handleSubmit(updateProductHandler)}
      >
        <InputComp2
          size={"w-full flex flex-col"}
          label={"Name"}
          lableStyle={"font-medium"}
          registerValue={"name"}
          value={catInfo?.name}
          errors={errors.name?.message}
          register={register}
        />

        <MediaInputUpdate
          style={"flex-col items-start"}
          state={newThumbnail}
          setState={validateImage} // Pass validation function instead of direct setter
          label={"Thumbnail"}
          image={catInfo?.thumbnail?.url}
        />

        <div className="w-full flex items-center justify-end">
          <button className="submitButton">Submit</button>
        </div>
      </form>
    </SimpleModal>
  );
};

export default EditCategoryModal;

import SimpleModal from "../Modals/SimpleModal";
import { state } from "../../../data/state.js";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import {
  lengthMsg,
  reqMsg,
  thankyouModalHandler,
  uploadImage,
  resizeFile, // Importing resize function
} from "../../../utils/const_API.js";
import { postCategory } from "../../../utils/categoryAPI.js";
import { useNavigate } from "react-router-dom";
import InputComp3 from "../UI/Inputs/InputComp3.jsx";
import MediaInput from "../UI/Inputs/MediaInput.jsx";
import { SubmitButton } from "../UI/Buttons/AddButton.jsx";
import { FailureAlert } from "../../Toast.jsx";

const schema = yup.object({
  name: yup.string().required(reqMsg).min(4, lengthMsg(4)),
});

const CreateCategoryModal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [thumbnail, setThumbnail] = useState(null); // Default to null
  const navigate = useNavigate();

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
      setThumbnail(resizedImage);
    };
  };

  const categoryFormHandler = async (data) => {
    if (!thumbnail) {
      FailureAlert("Thumbnail is required");
      return;
    }

    try {
      closeModalHandler();
      state.isLoading = true;

      const formdata = new FormData();
      formdata.append("file", thumbnail);
      let res = await uploadImage(formdata);

      if (res?.status === 200) {
        Object.assign(data, { ThumbnailId: res?.data[0]?.id });
        const response = await postCategory(data);
        if (response?.status === 200) {
          state.refreshCategoryList = true;
          thankyouModalHandler();
          navigate("/categories");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      state.isLoading = false;
    }
  };

  const closeModalHandler = () => {
    state.showCreateCategoryModal = false;
  };

  return (
    <SimpleModal closeModalHandler={closeModalHandler} modalSize={"max-w-xl"}>
      <form
        className="w-full p-8 flex flex-col gap-4"
        onSubmit={handleSubmit(categoryFormHandler)}
      >
        <InputComp3
          label={"Name"}
          register={register}
          registerValue={"name"}
          error={errors.name?.message}
        />

        <MediaInput
          style={"w-full flex flex-col"}
          label={"Thumbnail"}
          image={thumbnail}
          setImage={validateImage} // Pass validation function instead of direct setter
          required
          recSize={"Max 1MB & Ratio 16:9"}
        />

        <SubmitButton />
      </form>
    </SimpleModal>
  );
};

export default CreateCategoryModal;

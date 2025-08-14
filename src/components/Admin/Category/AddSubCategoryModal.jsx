import { useState } from "react";
import { state } from "../../../data/state.js";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { reqMsg, uploadImage } from "../../../utils/const_API.js";
import { FailureAlert, SuccessAlert } from "../../Toast.jsx";
import { postSubCategory } from "../../../utils/categoryAPI.js";
import InputComp3 from "../UI/Inputs/InputComp3.jsx";
import MediaInput from "../UI/Inputs/MediaInput.jsx";
import { useParams } from "react-router-dom";
import SimpleModal from "../Modals/SimpleModal.jsx";
import { SubmitButton } from "../UI/Buttons/AddButton.jsx";

const schema = yup.object({
  name: yup.string().required(reqMsg),
});

const AddSubCategoryModal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [thumbnail, setThumbnail] = useState("");

  const param = useParams();

  const subCategoryFormHandler = async (inputData) => {
    if (!thumbnail) {
      FailureAlert("Thumbnail is required");
      return;
    }

    try {
      const categoryData = { ...inputData, CategoryId: +param.id };
      const formData = new FormData();
      formData.append("file", thumbnail);

      const res = await uploadImage(formData);

      if (res?.status === 200) {
        const thumbnailId = res.data[0]?.id;
        await postSubCategory({ ...categoryData, ThumbnailId: thumbnailId });
        closeModalHandler();
        SuccessAlert("Sub-Category Created");
        state.refreshSubCategoryList = true;
      }
    } catch (error) {
      console.error("Error creating sub-category:", error);
    } finally {
    }
  };

  const closeModalHandler = () => {
    state.showAddSubCategoryModal = false;
  };

  return (
    <SimpleModal closeModalHandler={closeModalHandler} modalSize={"max-w-xl"}>
      <form
        className="p-6 w-full flex flex-col gap-4"
        onSubmit={handleSubmit(subCategoryFormHandler)}
      >
        <InputComp3
          label={"Name"}
          register={register}
          registerValue={"name"}
          error={errors.name?.message}
        />

        <MediaInput
          label={"Thumbnail"}
          image={thumbnail}
          setImage={setThumbnail}
          style={"flex-col"}
        />

        <SubmitButton />
      </form>
    </SimpleModal>
  );
};

export default AddSubCategoryModal;

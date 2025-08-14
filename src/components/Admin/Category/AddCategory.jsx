import { state } from "../../../data/state.js";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import {
  reqMsg,
  thankyouModalHandler,
  uploadImage,
} from "../../../utils/const_API.js";
import { postCategory } from "../../../utils/categoryAPI.js";
import { useNavigate } from "react-router-dom";
import InputComp3 from "../UI/Inputs/InputComp3.jsx";
import FormContainer from "../UI/FormContainer.jsx";
import MediaInput from "../UI/Inputs/MediaInput.jsx";
import { FailureAlert } from "../../Toast.jsx";

const schema = yup.object({
  name: yup.string().required(reqMsg),
});

const AddCategory = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [thumbnail, setThumbnail] = useState("");

  const navigate = useNavigate();

  const categoryFormHandler = async (data) => {
    if (!thumbnail) {
      FailureAlert("Thumbnail is required");

      return;
    }
    try {
      const formdata = new FormData();
      formdata.append("file", thumbnail);
      let res = await uploadImage(formdata);
      if (res?.status === 200) {
        data = { ThumbnailId: res?.data[0]?.id };
        const response = await postCategory(data);
        if (response?.status === 200) {
          thankyouModalHandler();
          navigate("/categories");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="w-full mb-10" onSubmit={handleSubmit(categoryFormHandler)}>
      <FormContainer title={"Create Category"} />

      <div className="w-full max-w-[800px] mx-auto mt-8  rounded bg-gray-50/80 p-8">
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
          required
          recSize={"Max 1mb & Ratio 3 : 2"}
        />

        <div className="w-full flex items-center justify-end">
          <button className="submitButton">Submit</button>
        </div>
      </div>
    </form>
  );
};

export default AddCategory;

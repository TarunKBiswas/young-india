import { state } from "../../../../data/state";
import SimpleModal from "../../Modals/SimpleModal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { lengthMsg, reqMsg, uploadImage } from "../../../../utils/const_API";
// import VideoInput from "../../UI/Inputs/VideoInput";
import { useState } from "react";
import { SubmitButton } from "../../UI/Buttons/AddButton";
import { createTestimonials } from "../../../../utils/testimonials";
import { SuccessAlert } from "../../../Toast";
import MediaInput from "../../UI/Inputs/MediaInput";

const schema = yup.object({
  content: yup.string().required(reqMsg).min(4, lengthMsg(4)),
  rating: yup.string().required(reqMsg),
  name: yup.string().required(reqMsg),
});

const CreateTestimonailModal = () => {
  const [thumbnail, setThumbnail] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const closeModalHandler = () => {
    state.showCreateTestimonidalModal = false;
  };

  const createTestimonialHandler = async (data) => {
    closeModalHandler();

    try {
      let formdata = new FormData();
      formdata.append("file", thumbnail);
      let res = await uploadImage(formdata);
      if (res.status === 200) {
        let finalData = { ...data, ThumbnailId: res?.data[0]?.id };
        let res2 = await createTestimonials(finalData);
        if (res2.status === 200) {
          SuccessAlert("Testimonials created successfully");
          state.refreshTestimonialList = true;
          closeModalHandler();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SimpleModal closeModalHandler={closeModalHandler}>
      <form
        className="w-full flex flex-col gap-4 p-4"
        onSubmit={handleSubmit(createTestimonialHandler)}
      >
        <MediaInput
          label={"Thumbnail"}
          image={thumbnail}
          setImage={setThumbnail}
          required
          recSize={"200 X 200"}
          style={"w-full flex flex-col gap-1 text-sm"}
        />

        <div className="w-full flex items-start text-sm flex-col ">
          <label className="font-medium w-40">
            Name<span className="text-red-500">*</span>
          </label>
          <div className="w-full">
            <input
              type="text"
              className="w-full formInput outline-none border-gray-200 rounded ring-0 focus:ring-0"
              {...register("name")}
            />
          </div>
          <p className="text-red-600 text-sm">{errors?.content?.message}</p>
        </div>

        <div className="w-full flex flex-col gap-1">
          <label className="font-medium w-40">
            Rating<span className="text-red-500">*</span>
          </label>
          <div className="w-full">
            <input
              type="number"
              min="1"
              max="5"
              step="0.5"
              required
              className="w-full formInput outline-none border-gray-200 rounded ring-0 focus:ring-0"
              {...register("rating")}
            />
          </div>
          <p className="text-red-600 text-sm">{errors?.rating?.message}</p>
        </div>

        <div className="w-full flex  flex-col text-sm gap-1 ">
          <label className="font-medium w-40">
            Message<span className="text-red-500">*</span>
          </label>
          <div className="w-full">
            <textarea
              className="w-full formInput outline-none border-gray-200 rounded ring-0 focus:ring-0"
              {...register("content")}
            />
          </div>
          <p className="text-red-600 text-sm">{errors?.content?.message}</p>
        </div>

        <SubmitButton />
      </form>
    </SimpleModal>
  );
};

export default CreateTestimonailModal;

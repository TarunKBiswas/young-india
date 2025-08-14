import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Editor from "react-simple-wysiwyg";
import { state } from "../../../../data/state.js";
import { createTutorials } from "../../../../utils/Tutorials.js";
import {
  lengthMsg,
  reqMsg,
  thankyouModalHandler,
  uploadImage,
} from "../../../../utils/const_API.js";
import { useNavigate } from "react-router-dom";
import MediaInput from "../../UI/Inputs/MediaInput.jsx";
import InputComp3 from "../../UI/Inputs/InputComp3.jsx";

const schema = yup.object({
  name: yup.string().required(reqMsg).min(4, lengthMsg(4)),
  video_url: yup.string().required(reqMsg),
});

const CreateTutorial = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [thumbnail, setThumbnail] = useState(null);
  const [desc, setDesc] = useState(null);
  const navigate = useNavigate();

  const submitHandler = async (data) => {
    try {
      const formdata = new FormData();
      formdata.append("files", thumbnail);
      let res = await uploadImage(formdata);
      if (res?.status === 200) {
        let finalData = {
          ...data,
          description: desc,
          thumbnail: res?.data[0]?.id,
        };
        let res2 = await createTutorials(finalData);
        if (res2?.status === 200) {
          thankyouModalHandler();
          navigate("/banner&tutorial");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="col-sm-8 m-auto">
      <div className="card">
        <div className="card-body">
          <div className="w-full flex items-start justify-between">
            <div className="card-header-2">
              <h5>Add Tutorial</h5>
            </div>
          </div>

          <form
            className="theme-form theme-form-2 mega-form mt-4"
            onSubmit={handleSubmit(submitHandler)}
          >
            <InputComp3
              register={register}
              label={"Name"}
              registerValue={"name"}
              error={errors.name?.message}
            />
            <InputComp3
              register={register}
              label={"Video URL"}
              registerValue={"video_url"}
              error={errors.video_url?.message}
            />

            <MediaInput
              label={"Thumbnail"}
              image={thumbnail}
              setImage={setThumbnail}
            />

            <div className="mb-4 row align-items-center">
              <label className="col-sm-3 col-form-label form-label-title">
                Description<span className="text-red-500">*</span>
              </label>
              <div className="form-group col-sm-9">
                <Editor
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
              </div>
            </div>

            <div className="w-full flex items-center justify-end">
              <button type="submit" className="submitButton">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTutorial;

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import resizer from "../../../../utils/resizer.js";
import Editor from "react-simple-wysiwyg";
import {
  IP,
  resizeFile,
  thankyouModalHandler,
  uploadImage,
} from "../../../../utils/const_API.js";
import {
  getSingleTutorials,
  updateTutorials,
} from "../../../../utils/Tutorials.js";
import { useNavigate, useNavigation, useParams } from "react-router-dom";
import { Textarea } from "flowbite-react";
import { state } from "../../../../data/state.js";
import { InfoAlert } from "../../../Toast.jsx";

const schema = yup.object({
  name: yup.string(),
  video_url: yup.string(),
  description: yup.string(),
});

const UpdateTutorial = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: async () => await getData(),
  });

  const [tutorialData, setTutorialData] = useState(null);

  const [thumbnail, setThumbnail] = useState(null);

  const param = useParams();
  const naviagte = useNavigate();

  const getData = async () => {
    try {
      let res = await getSingleTutorials(param.id);
      if (res?.status === 200) {
        setTutorialData(res?.data?.data?.attributes);
        return res?.data?.data?.attributes;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (tutorialData === null) {
      getData();
    }
  }, [tutorialData]);

  // Image Resizer
  const resizeImageFile = async (e) => {
    try {
      const file = e.target.files[0];
      const image = await resizeFile(file);
      setThumbnail(image);
    } catch (error) {
      console.log(error);
    }
  };

  const editHandler = async (data) => {
    try {
      if (thumbnail !== null) {
        let formdata = new FormData();
        formdata.append("files", thumbnail);
        let res = await uploadImage(formdata);
        if (res?.status === 200) {
          let finalData = { ...data, thumbnail: res?.data[0]?.id };
          let res2 = await updateTutorials(param.id, finalData);
          if (res2?.status === 200) {
            naviagte("/banner&tutorial");
            thankyouModalHandler();
          }
        }
      } else {
        let finalData = {
          ...data,
          thumbnail: tutorialData?.thumbnail?.data?.id,
        };
        let res2 = await updateTutorials(param.id, finalData);
        if (res2?.status === 200) {
          InfoAlert("Tutorial Updated");
          naviagte("/banner&tutorial");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="row">
            <div className="col-sm-8 m-auto">
              <div className="card">
                <div className="card-body">
                  <div className="w-full flex items-start justify-between">
                    <div className="card-header-2">
                      <h5>Update Tutorial</h5>
                    </div>
                  </div>

                  <form
                    className="theme-form theme-form-2 mega-form mt-4"
                    onSubmit={handleSubmit(editHandler)}
                  >
                    <div className="mb-4 row align-items-center">
                      <label className="form-label-title col-sm-3 mb-0">
                        Name<span className="text-red-500">*</span>
                      </label>
                      <div className="col-sm-9">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Name"
                          defaultValue={tutorialData?.name}
                          {...register("name", { value: tutorialData?.name })}
                        />
                        <p className="text-red-600 text-sm ">
                          {errors.name?.message}
                        </p>
                      </div>
                    </div>

                    <div className="mb-4 row align-items-center">
                      <label className="form-label-title col-sm-3 mb-0">
                        Video URL<span className="text-red-500">*</span>
                      </label>
                      <div className="col-sm-9">
                        <input
                          className="form-control"
                          type="text"
                          placeholder=" Video URL"
                          defaultValue={tutorialData?.video_url}
                          {...register("video_url", {
                            value: tutorialData?.video_url,
                          })}
                        />
                        <p className="text-red-600 text-sm ">
                          {errors.video_url?.message}
                        </p>
                      </div>
                    </div>

                    <div className="mb-4 row align-items-center">
                      <label className="col-sm-3 col-form-label form-label-title">
                        Thumbnail<span className="text-red-500">*</span>
                      </label>

                      <div className="col-sm-9">
                        <label
                          htmlFor="dropzone-file"
                          className="flex justify-center items-center h-40 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-100 form-group "
                        >
                          <input
                            type="file"
                            accept="image/png, image/jpeg, image/jpg, image/webp"
                            id="dropzone-file"
                            onChange={resizeImageFile}
                            className="hidden"
                          />

                          <div className="flex flex-col justify-center items-center p-6 ">
                            {thumbnail ? (
                              <>
                                <img
                                  className="w-60 h-36 object-contain rounded-t-lg md:rounded-none md:rounded-l-lg"
                                  src={URL.createObjectURL(thumbnail)}
                                  alt="Image"
                                  width={"auto"}
                                  height={"auto"}
                                />
                              </>
                            ) : (
                              <>
                                <img
                                  className="w-56 h-40 object-contain rounded-t-lg md:rounded-none md:rounded-l-lg"
                                  src={
                                    tutorialData?.thumbnail?.data?.attributes
                                      ?.url
                                  }
                                  alt="Image"
                                  width={"auto"}
                                  height={"auto"}
                                />
                              </>
                            )}
                          </div>
                        </label>
                      </div>
                    </div>

                    <div className="mb-4 row align-items-center">
                      <label className="col-sm-3 col-form-label form-label-title">
                        Description<span className="text-red-500">*</span>
                      </label>
                      <div className="form-group col-sm-9">
                        <Textarea
                          rows={8}
                          defaultValue={tutorialData?.description}
                          {...register("description", {
                            value: tutorialData?.description,
                          })}
                        />
                        <p className="text-red-600 text-sm">
                          {errors.description?.message}
                        </p>
                      </div>
                    </div>

                    <div className="w-full flex items-center justify-end">
                      <button className="submitButton">Submit</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateTutorial;
